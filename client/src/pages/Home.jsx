// import React, { useState } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [paperTitle, setPaperTitle] = useState('');
//   const [response, setResponse] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:3000/api/research', { paperTitle });
//       setResponse(res.data);
//     } catch (error) {
//       console.error('Error submitting research paper name', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={paperTitle}
//           onChange={(e) => setPaperTitle(e.target.value)}
//           placeholder="Enter research paper title"
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {response && (
//         <div>
//           <h2>Paper Details</h2>
//           <p><strong>Title:</strong> {response.paper_title}</p>
//           <p><strong>Authors:</strong> {response.authors}</p>
//           <p><strong>Abstract:</strong> {response.abstract}</p>
//           <h3>Recommendations</h3>
//           <ul>
//             {response.recommendations.map((rec, index) => (
//               <li key={index}>
//                 <p><strong>Title:</strong> {rec.paper_title}</p>
//                 <p><strong>Authors:</strong> {rec.authors}</p>
//                 <p><strong>Abstract:</strong> {rec.abstract}</p>
//                 <p><strong>Similarity:</strong> {rec.similarity}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Error = styled.p`
  color: red;
  margin-bottom: 20px;
`;

const ResponseContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const ResponseBox = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Recommendations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Heading = styled.h2`
  margin-bottom: 10px;
`;

const SubHeading = styled.h3`
  margin-bottom: 10px;
`;

export default function Home() {
  const [paperTitle, setPaperTitle] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError(null); // Reset error state before submission
      const res = await axios.post('http://localhost:3000/api/research', { paperTitle });
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting research paper name', error);
      setError('Failed to get recommendations. Please try again.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={paperTitle}
          onChange={(e) => setPaperTitle(e.target.value)}
          placeholder="Enter research paper title"
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>

      {error && <Error>{error}</Error>}

      {response && (
        <ResponseContainer>
          <Heading>Paper Details</Heading>
          <ResponseBox>
            <p><strong>Title:</strong> {response.paper_title}</p>
            <p><strong>Authors:</strong> {response.authors}</p>
            <p><strong>Abstract:</strong> {response.abstract}</p>
          </ResponseBox>
          <SubHeading>Recommendations</SubHeading>
          <Recommendations>
            {response.recommendations && response.recommendations.length > 0 ? (
              response.recommendations.map((rec, index) => (
                <ResponseBox key={index}>
                  <p><strong>Title:</strong> {rec.paper_title}</p>
                  <p><strong>Authors:</strong> {rec.authors}</p>
                  <p><strong>Abstract:</strong> {rec.abstract}</p>
                  <p><strong>Similarity:</strong> {rec.similarity}</p>
                </ResponseBox>
              ))
            ) : (
              <p>No recommendations found.</p>
            )}
          </Recommendations>
        </ResponseContainer>
      )}
    </Container>
  );
}

