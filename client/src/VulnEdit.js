// FIXME: Data doesn't show up when editing, need to fill all fields, then you can edit.

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const VulnEdit = () => {
    // Acess CVE value from URL
    const { vuln_cve } = useParams();

    // States for the vulnerability data
    const [vulndata, setVulnData] = useState({});
    const [cve,cvechange]=useState("");
    const [vulnType,typechange]=useState("");
    const [vulnSeverity,severitychange]=useState("");
    const [vulnDescription,descriptionchange]=useState("");
    const [validation,valchange]=useState(false);

    const navigate=useNavigate();

    // Fetch vulnerability data from the backend
    useEffect(() => {
        fetch("http://localhost:5000/" + vuln_cve)
          .then((res) => {
            return res.json();

        }).then((data) => {
            // update the state variables with the data that was fetched
            setVulnData(data)
            cvechange(data.cve || "");
            typechange(data.vuln_type || "");
            severitychange(data.vuln_severity || "");
            descriptionchange(data.vuln_description || "");
            console.log(data)  // Log the backend data
            console.log(cvechange, typechange, severitychange, descriptionchange)

        }).catch((err) => {
            console.log(err.message);
        })
    }, [vuln_cve]);

    const handlesubmit=(e)=>{
      e.preventDefault();
      const vulndata={cve, vuln_type: vulnType, vuln_severity: vulnSeverity, vuln_description: vulnDescription};
      console.log(vulndata)
      

      fetch("http://localhost:5000/" + vuln_cve,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(vulndata)
      }).then((res)=>{
        alert('Vulnerability edited successfully.')
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
                <h2>Edit Vulnerability Listing</h2>
              </div>
              <div className="card-body">

                <div className="row">

                  {/* VULNERABILITY CVE */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>CVE</label>
                      <input value={vuln_cve} disabled="disabled" className="form-control"></input>
                      {vuln_cve.length==0 && validation && <span className="text-danger">Field is required! e.g. CVE-2023-28337</span>}
                    </div>
                  </div>

                  {/* VULNERABILITY TYPE */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Type</label>
                      <input value={vulnType} onChange={e=>typechange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  {/* VULNERABILITY SEVERITY */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Severity</label>
                      <input value={vulnSeverity} onChange={e=>severitychange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  {/* VULNERABILITY DESCRIPTION */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <input value={vulnDescription} onChange={e=>descriptionchange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  {/* SAVE BUTTON */}
                  <div className="col-lg-12">
                    <div className="form-group">
                        <button className="btn btn-success" type="submit">Save</button>
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
 
export default VulnEdit;

