from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from gensim.models.doc2vec import Doc2Vec
from nltk.tokenize import word_tokenize
import pickle

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load preprocessed data and model
model = Doc2Vec.load('doc2vec.model')
papers = pd.read_pickle('papers.pkl')
with open('citation_similarity.pkl', 'rb') as f:
    citation_similarity = pickle.load(f)

# Clean the abstracts column (if needed)
papers['abstract'] = papers['abstract'].fillna('')

# Extract abstracts and paper IDs
abstracts = papers['abstract'].tolist()

# Function to recommend similar abstracts
def recommend_papers(doc_id, top_n=5):
    inferred_vector = model.infer_vector(word_tokenize(abstracts[doc_id].lower()))
    content_sims = model.dv.most_similar([inferred_vector], topn=len(papers))
    content_sims_dict = {int(tag): sim for tag, sim in content_sims}

    max_content_sim = max(content_sims_dict.values())
    content_sims_dict = {k: v / max_content_sim for k, v in content_sims_dict.items()}

    citation_sims = citation_similarity[doc_id]
    citation_sims_dict = {i: citation_sims[i] for i in range(len(papers))}

    max_citation_sim = max(citation_sims_dict.values())
    if max_citation_sim > 0:
        citation_sims_dict = {k: v / max_citation_sim for k, v in citation_sims_dict.items()}
    else:
        citation_sims_dict = {k: 0 for k in citation_sims_dict}

    combined_sims = {i: content_sims_dict.get(i, 0) * 0.5 + citation_sims_dict.get(i, 0) * 0.5 for i in range(len(papers))}

    recommended_abstracts = sorted(combined_sims.items(), key=lambda item: item[1], reverse=True)
    recommended_abstracts = [(idx, sim) for idx, sim in recommended_abstracts if idx != doc_id][:top_n]

    return recommended_abstracts

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    paper_title = data.get('paper_title')

    doc_id = next((i for i, paper in papers.iterrows() if paper['title'].lower() == paper_title.lower()), None)

    if doc_id is None:
        return jsonify({"error": "Paper not found"}), 404

    recommendations = recommend_papers(doc_id)

    response = {
        "paper_title": papers.loc[doc_id, 'title'],
        "authors": papers.loc[doc_id, 'authors'],
        "abstract": papers.loc[doc_id, 'abstract'],
        "recommendations": []
    }

    for idx, sim in recommendations:
        response['recommendations'].append({
            "paper_title": papers.loc[idx, 'title'],
            "authors": papers.loc[idx, 'authors'],
            "abstract": papers.loc[idx, 'abstract'],
            "similarity": sim
        })

    return jsonify(response)

if __name__ == '__main__':
    app.run(port=6000, debug=True)





# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# from gensim.models.doc2vec import Doc2Vec
# from nltk.tokenize import word_tokenize
# import pickle

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Load preprocessed data and model
# model = Doc2Vec.load('doc2vec.model')
# papers = pd.read_pickle('papers.pkl')
# with open('citation_similarity.pkl', 'rb') as f:
#     citation_similarity = pickle.load(f)

# # Clean the abstracts column (if needed)
# papers['abstract'] = papers['abstract'].fillna('')

# # Extract abstracts and paper IDs
# abstracts = papers['abstract'].tolist()

# # Function to recommend similar abstracts
# def recommend_papers(doc_id, top_n=5):
#     inferred_vector = model.infer_vector(word_tokenize(abstracts[doc_id].lower()))
#     content_sims = model.dv.most_similar([inferred_vector], topn=len(papers))
#     content_sims_dict = {int(tag): sim for tag, sim in content_sims}

#     max_content_sim = max(content_sims_dict.values())
#     content_sims_dict = {k: v / max_content_sim for k, v in content_sims_dict.items()}

#     citation_sims = citation_similarity[doc_id]
#     citation_sims_dict = {i: citation_sims[i] for i in range(len(papers))}

#     max_citation_sim = max(citation_sims_dict.values())
#     if max_citation_sim > 0:
#         citation_sims_dict = {k: v / max_citation_sim for k, v in citation_sims_dict.items()}
#     else:
#         citation_sims_dict = {k: 0 for k in citation_sims_dict}

#     combined_sims = {i: content_sims_dict.get(i, 0) * 0.5 + citation_sims_dict.get(i, 0) * 0.5 for i in range(len(papers))}

#     recommended_abstracts = sorted(combined_sims.items(), key=lambda item: item[1], reverse=True)
#     recommended_abstracts = [(idx, sim) for idx, sim in recommended_abstracts if idx != doc_id][:top_n]

#     return recommended_abstracts

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     data = request.json
#     paper_title = data.get('paper_title')

#     doc_id = next((i for i, paper in papers.iterrows() if paper['title'].lower() == paper_title.lower()), None)

#     if doc_id is None:
#         return jsonify({"error": "Paper not found"}), 404

#     recommendations = recommend_papers(doc_id)

#     response = {
#         "paper_title": papers.loc[doc_id, 'title'],
#         "authors": papers.loc[doc_id, 'authors'],
#         "abstract": papers.loc[doc_id, 'abstract'],
#         "recommendations": []
#     }

#     for idx, sim in recommendations:
#         response['recommendations'].append({
#             "paper_title": papers.loc[idx, 'title'],
#             "authors": papers.loc[idx, 'authors'],
#             "abstract": papers.loc[idx, 'abstract'],
#             "similarity": sim
#         })

#     return jsonify(response)

# @app.route('/api/research', methods=['POST'])
# def research():
#     data = request.json
#     paper_title = data.get('paperTitle')
#     if not paper_title:
#         return jsonify({'error': 'Paper title is required'}), 400
    
#     try:
#         # Find the document ID for the given paper title
#         doc_id = next((i for i, paper in papers.iterrows() if paper['title'].lower() == paper_title.lower()), None)

#         if doc_id is None:
#             return jsonify({"error": "Paper not found"}), 404

#         recommendations = recommend_papers(doc_id)
        
#         response = {
#             "paper_title": papers.loc[doc_id, 'title'],
#             "authors": papers.loc[doc_id, 'authors'],
#             "abstract": papers.loc[doc_id, 'abstract'],
#             "recommendations": []
#         }

#         for idx, sim in recommendations:
#             response['recommendations'].append({
#                 "paper_title": papers.loc[idx, 'title'],
#                 "authors": papers.loc[idx, 'authors'],
#                 "abstract": papers.loc[idx, 'abstract'],
#                 "similarity": sim
#             })

#         return jsonify(response)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=6000, debug=True)

