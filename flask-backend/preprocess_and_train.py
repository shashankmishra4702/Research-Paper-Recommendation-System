import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from nltk.tokenize import word_tokenize
import nltk
import pickle

# Download NLTK data files (only need to do this once)
nltk.download('punkt')

# Load data
papers = pd.read_excel('updated_dataset.xlsx')

# Clean the abstracts column
papers['abstract'] = papers['abstract'].fillna('')

# Extract abstracts and paper IDs
abstracts = papers['abstract'].tolist()
paper_ids = papers['id'].tolist()

# Preprocess and tag the documents for content-based filtering
tagged_data = [TaggedDocument(words=word_tokenize(abstract.lower()), tags=[str(i)]) for i, abstract in enumerate(abstracts)]

# Train the Doc2Vec model
model = Doc2Vec(vector_size=50, alpha=0.025, min_alpha=0.00025, min_count=1, dm=1, epochs=100)
model.build_vocab(tagged_data)
model.train(tagged_data, total_examples=model.corpus_count, epochs=model.epochs)

# Create a citation matrix
citation_matrix = np.zeros((len(papers), len(papers)))

for i, paper in papers.iterrows():
    for citation in paper['citations']:
        if citation in paper_ids:
            citation_index = paper_ids.index(citation)
            citation_matrix[i, citation_index] = 1

# Compute cosine similarity for citation-based filtering
citation_similarity = cosine_similarity(citation_matrix)

# Save the model and data
model.save('doc2vec.model')
papers.to_pickle('papers.pkl')
with open('citation_similarity.pkl', 'wb') as f:
    pickle.dump(citation_similarity, f)
