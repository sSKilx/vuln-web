import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VulnDetails = () => {
    // Acess CVE value from URL
    const { vuln_cve } = useParams();

    // State variable that stores vulnerability data
    const [vulndata, setVulnData] = useState({});

    useEffect(() => {
        // Fetch data based on the value of the CVE
        fetch("http://localhost:5000/"+ vuln_cve)
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            // set vulnerability data in state variable
            setVulnData(resp);
            console.log(resp); // Debugging
          })
          .catch((err) => {
            console.log(err.message);
          })
    }, []); // Run only once

    return ( 
        <div>
            <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2>Vulnerability Details</h2>
                            </div>
                            <div className="card-body"></div>

            {/* Displays the vulnerability data if it exists */}
            {vulndata.vulnerability &&
                <div>
                    <h2>Vulnerability: <b>{vulndata.vulnerability.vuln_cve}</b></h2>
                    <h3>Information</h3>
                    <h5>Type: {vulndata.vulnerability.vuln_type}</h5>
                    <h5>Severity: {vulndata.vulnerability.vuln_severity}</h5>
                    <h5>Description: {vulndata.vulnerability.vuln_description}</h5>
                    <Link className="btn btn-danger" to="/">Back to Listing</Link>
                </div>
            }
            </div>
        </div>
     );
}

export default VulnDetails;