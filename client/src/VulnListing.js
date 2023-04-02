import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VulnListing = () => {
    // State variable that stores vulnerability data
    const [vulnData, setVulnData] = useState(null);

    const navigate = useNavigate();

    // Function to navigate to http://[URL]/details/[CVE]
    const LoadDetail = (vuln_cve) => {
        navigate("/details/" + vuln_cve);
    }

    // Function to navigate to http://[URL]/edit/[CVE]
    const LoadEdit = (vuln_cve) => {
        navigate("/edit/" + vuln_cve);
    }

    // Function to remove a vulnerability for the list
    const Removefunction = (vuln_cve) => {
        if (window.confirm('Do you want to remove this CVE listing?')) {
            fetch("http://localhost:5000/" + vuln_cve, {
                method: "DELETE"
            }).then((res) => {
                // Show an alert when removed succesfully
                alert('Removed successfully.')
                // Reload the page
                window.location.reload();
            }).catch((err) => {
                // Log any errors
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:5000/")
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            // Set vulnerability data in state variable
            setVulnData(resp["Vulnerabilities"]);
          })
          .catch((err) => {
            // Log any errors
            console.log(err.message);
          })
      }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Vulnerability Listing</h2>
        </div>
        <div className="card-body">
            <div className="divbtn">
                {/* Button to create a vulnerability listing */}
                <Link to="/create" className="btn btn-success" >Add New (+)</Link>
            </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>CVE</td>
                <td>Type</td>
                <td>Severity</td>
                <td>Description</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>

                {/* Look through vulnerability data & display in a table */}
                {vulnData &&
                    vulnData.map(item => (
                        <tr key={item.id}>
                            <td>{item.vuln_cve}</td>
                            <td>{item.vuln_type}</td>
                            <td>{item.vuln_severity}</td>
                            <td>{item.vuln_description}</td>
                            <td><a onClick={() => { LoadEdit(item.vuln_cve) }} className="btn btn-success">Edit</a>
                                <a onClick={() => { Removefunction(item.vuln_cve) }} className="btn btn-danger">Remove</a>
                                <a onClick={() => { LoadDetail(item.vuln_cve) }} className="btn btn-primary">Details</a>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VulnListing;
