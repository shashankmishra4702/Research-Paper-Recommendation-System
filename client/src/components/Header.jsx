// import { Link } from "react-router-dom"
// import { useSelector } from 'react-redux';

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
  
//   return (
//     <div className='bg-slate-300'>
//       <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
//         <Link to='/'>
//             <h1 className='font-bold'>Research Paper Recommendation System</h1>
//         </Link>
        
//         <ul className='flex gap-4'>
            
//             <Link to='/'>
//                 <li>Home</li>
//             </Link>
            
//             <Link to='/about'>
//                 <li>About</li>
//             </Link>

//             <Link to='/profile'>
//             {currentUser ? (
//               <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
//             ) : (
//               <li>Sign In</li>
//             )}
//           </Link>
//         </ul>
        
//       </div>
//     </div>
//   )
// }


import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #003366; /* Blue background color */
  color: #ffffff; /* White text color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow effect */
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff; /* White color for the logo */
  transition: color 0.3s ease;

  &:hover {
    color: #e5e7eb; /* Light gray color on hover */
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
`;

const NavItem = styled.li`
  font-size: 1rem;
  color: #e5e7eb; /* Light gray color for nav items */
  transition: color 0.3s ease, transform 0.3s ease;
  
  /* Add margin to create space between items */
  margin-right: 3rem; /* Adjust this value to your desired spacing */
  
  &:last-child {
    margin-right: 10; /* Remove margin for the last item if desired */
  }

  &:hover {
    color: #ffffff; /* White color on hover */
    transform: translateY(-2px); /* Slight lift effect */
  }
  
  a {
    text-decoration: none;
    color: inherit; /* Inherit color from parent */
  }
`;


const ProfilePicture = styled.img`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  object-fit: cover;
  transition: border 0.3s ease;

  &:hover {
    border: 2px solid #e5e7eb; /* Light gray border on hover */
  }
`;

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to='/'>
          <Logo>Research Paper Recommendation System</Logo>
        </Link>
        
        <NavList>
          <Link to='/'>
            <NavItem>Home</NavItem>
          </Link>
          
          <Link to='/about'>
            <NavItem>About</NavItem>
          </Link>

          <Link to='/profile'>
            {currentUser ? (
              <ProfilePicture src={currentUser.profilePicture} alt='profile' />
            ) : (
              <NavItem>Sign In</NavItem>
            )}
          </Link>
        </NavList>
      </HeaderContent>
    </HeaderContainer>
  );
}


