export const EventSourceData = () => {
  const event = new EventSource(`${process.env.REACT_APP_IP}/ticket/addWallet`);
  if (typeof event !== undefined) {
    console.log("Inside event");
  } else {
    console.log("Outside event");
  }
  event.onmessage = (event) => {
    const eventData = JSON.parse(event.data);
    console.log(eventData);
  };
  return event.close();
};
