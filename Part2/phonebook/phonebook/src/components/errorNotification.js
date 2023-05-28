const ErrorNotification = ({message}) => {
    if (message === null){
      return null;
    }
    return (
      <div className="errorNotification">
        <p>Error!!! {message}</p>
      </div>
    )
  }


export default ErrorNotification