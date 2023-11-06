const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <>
      {
        type === 'error' &&
        <div className='error'>
          {message}
        </div>
      }
      {
        type === ('add_person' || 'change-number') &&
        <div className='add-change'>
          {message}
        </div>
      }
    </>
  )
};
export default Notification;