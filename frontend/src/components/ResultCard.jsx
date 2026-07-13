function ResultCard({ title, content }) {
  return (
    <div
      style={{
        background: "#fff",
        marginTop: "20px",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,.1)",
      }}
    >
      <h2>{title}</h2>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "15px",
          fontFamily: "Arial",
        }}
      >
        {content}
      </pre>
    </div>
  );
}

export default ResultCard;