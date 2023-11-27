const Marquee = ({data}) => {
  return (
    <div>
      <marquee style={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>
        Winner: {data}, Cash Price: ₹3000
      </marquee>
    </div>
  );
};
export default Marquee;
