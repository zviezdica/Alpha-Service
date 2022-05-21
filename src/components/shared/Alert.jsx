const Alert = ({ text, purpose }) => {
  return (
    <div className="w-max fixed top-30 left-1/2 -translate-x-1/2 text-secondary text-14 z-1">
      {purpose == "success" && (
        <h4 className="border-alert-green border-2 border-solid px-20 rounded-sm">
          {text}
        </h4>
      )}
      {purpose == "danger" && (
        <h4 className="border-alert-red border-2 border-solid px-20 rounded-md">
          {text}
        </h4>
      )}
    </div>
  );
};

export default Alert;
