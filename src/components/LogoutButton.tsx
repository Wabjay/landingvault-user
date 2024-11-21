const LogoutButton = ({ logout }: { logout?: () => void }) => (
    <div onClick={logout} className="logout-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M8.5 7C6.40769 8.20445 5 10.4557 5 13.034C5 16.8812 8.13401 20 12 20C15.866 20 19 16.8812 19 13.034C19 10.4556 17.5923 8.20445 15.5 7"
          stroke="#FF6464"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M12 10L12 4" stroke="#FF6464" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="text-[#FF6464] text-14 leading-5 font-medium px-1">Logout</p>
    </div>
  );
  
  export default LogoutButton;
  