function DownloadButtons({ resume, atsReport, improvementPlan }) {
  const downloadFile = (filename, content) => {
    const blob = new Blob([content], {
      type: "text/markdown;charset=utf-8",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginTop: "20px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => downloadFile("resume.md", resume)}
        style={buttonStyle}
      >
        Download Resume
      </button>

      <button
        onClick={() => downloadFile("ats_report.md", atsReport)}
        style={buttonStyle}
      >
        Download ATS Report
      </button>

      <button
        onClick={() =>
          downloadFile("improvement_plan.md", improvementPlan)
        }
        style={buttonStyle}
      >
        Download Improvement Plan
      </button>
    </div>
  );
}

const buttonStyle = {
  background: "#198754",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
};

export default DownloadButtons;