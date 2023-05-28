const SuccessNotification = ({message}) => {
    if (message === null){
      return null;
    }
    return (
      <div className='successNotification'>
        <p>Success!!! {message}</p>
      </div>
    )
  }
  


export default SuccessNotification 