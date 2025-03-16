import React, { useState } from "react";
import axios from "axios";

interface CounselingProps {
  user: any;
}

const Counseling: React.FC<CounselingProps> = ({ user }) => {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetCounseling = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/counselor", {
        user_id: user.id,
      });
      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error("Error getting counseling:", err);
      setError("Error getting counseling.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Counselor</h2>
      <button className="btn btn-secondary" onClick={handleGetCounseling} disabled={loading}>
      {loading ? "Analyzing..." : "Analyze My Mood"}
      </button>
      {error && <div className="alert alert-error mt-2">{error}</div>}
      {analysis && (
        <div className="alert alert-success mt-4">
          <h3 className="font-bold">Your Personalized Insights:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default Counseling;
