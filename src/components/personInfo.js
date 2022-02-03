import './personInfo.css';
const PersonInfo = (props) => {
  return (
    <div className="profile-wrapper">
      <div className="profile-pic">
        <img className="user-pic" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
      </div>    
      <div className="profile-info-wrapper">  
        <div className="profile-info"> ID - #{props.data.id}</div>
        <div className="profile-info"> First Name - {props.data.firstName}</div>
        <div className="profile-info"> Last Name - {props.data.lastName}</div>
      </div>
    </div>
  );
};
export default PersonInfo;
