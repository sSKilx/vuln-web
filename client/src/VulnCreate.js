import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VulnCreate = () => {
  // States for the vulnerability data
  const[vuln_cve,cvechange]=useState("");
  const[vuln_type,typechange]=useState("");
  const[vuln_severity,severitychange]=useState("");
  const[vuln_description,descriptionchange]=useState("");
  const[validation,valchange]=useState(false);

  const navigate=useNavigate();

  const handlesubmit=(e)=>{
    e.preventDefault();
    //console.log({cve,type,severity,description,active})
    const vulndata = {vuln_cve,vuln_type,vuln_severity,vuln_description};

    // Send POST request to backend
    fetch("http://localhost:5000/",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(vulndata)
      }).then((res)=>{
        alert('Vulnerability added successfully!')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

  }

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{"textAlign":"left"}}>
              <div className="card-title">
                <h2>Create Vulnerability Listing</h2>
              </div>
              <div className="card-body">

                <div className="row">

                  {/* VULNERABILITY CVE */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>CVE</label>
                      <input required value={vuln_cve} onMouseDown={e=>valchange(true)} onChange={e=>cvechange(e.target.value)} className="form-control"></input>
                      {vuln_cve.length==0 && validation && <span className="text-danger">Field is required! e.g. CVE-2023-28337</span>}
                    </div>
                  </div>

                  {/* VULNERABILITY TYPE */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Type</label>
                      <input value={vuln_type} onChange={e=>typechange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  {/* VULNERABILITY SEVERITY */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Severity</label>
                      <input value={vuln_severity} onChange={e=>severitychange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  {/* VULNERABILITY DESCRIPTION */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <input value={vuln_description} onChange={e=>descriptionchange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="col-lg-12">
                    <div className="form-group">
                        <button className="btn btn-success" type="submit">Submit</button>
                        <Link to="/" className="btn btn-danger">Back</Link>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VulnCreate;
