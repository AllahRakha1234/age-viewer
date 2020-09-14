import React, {useState} from 'react'
import {Collapse} from 'react-bootstrap'

const ServerConnectFrame = ({refKey, isPinned, reqString, connectToAgensGraph, addFrame, trimFrame,removeFrame, pinFrame, addAlert, getMetaData, getMetaChartData}) => {
    const [formData, setFormData] = useState({})
    const [isExpanded, setIsExpanded] = useState(true)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
          });
    }
    

    const setIconForIsExpanded = (isExpanded) => {
        if (isExpanded) {
            return <span className="fas fa-angle-up fa-lg" aria-hidden="true"></span>
        } else {
            return <span className="fas fa-angle-down fa-lg" aria-hidden="true"></span>
        }
    }

    return (
        < div className="card mt-3" >
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <button className={"frame-head-button btn btn-link px-3" + (isPinned ? " selected " : "")} onClick={() => pinFrame(refKey)}><span className="fas fa-paperclip fa-lg"
                        aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3" data-toggle="collapse"
                        aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} aria-controls={refKey}>
                        {setIconForIsExpanded(isExpanded)}</button>
                    <button className="frame-head-button btn btn-link pl-3">
                        <span className="fas fa-times fa-lg" aria-hidden="true" onClick={() => removeFrame(refKey)}></span></button>
                </div>
            </div>

            <Collapse in={isExpanded}>
            <div className="card-body collapse" id={refKey}>
                <div className="row">
                    <div className="col-3">
                        <h3>Connect to AgensGraph</h3>
                        <p>Database access might require and authenticated connection.</p>
                    </div>
                    <div className="col-9">
                        <form>
                            <fieldset className="form-group">
                                <label htmlFor="host">Connect URL</label>
                                <input type="text" className="form-control" name="host" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="port">Connect Port</label>
                                <input type="number" className="form-control" name="port" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="database">Database Name</label>
                                <input type="text" className="form-control" name="database" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="graph">Graph Path</label>
                                <input type="text" className="form-control" name="graph" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="user">User Name</label>
                                <input type="text" className="form-control" name="user" onChange={handleChange}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" autoComplete="on" onChange={handleChange}/>
                            </fieldset>
                            
                        </form>
                        <button className="btn btn-info" onClick={() => connectToAgensGraph(formData).then((response) => {
                                if (response.type === 'database/connectToAgensGraph/fulfilled'){
                                    addAlert('NoticeServerConnected')
                                    trimFrame('ServerConnect')
                                    getMetaData().then((response) => {
                                        if (response.type === 'database/getMetaData/rejected'){
                                            addAlert('ErrorMetaFail')
                                        } 
                                    })
                                    getMetaChartData()
                                    addFrame(':server status', 'ServerStatus')
                                } else if (response.type === 'database/connectToAgensGraph/rejected') {
                                    addAlert('ErrorServerConnectFail', response.error.message)
                                }
                            })}>CONNECT</button>
                    </div>
                </div>
            </div>
            </Collapse>
            <div className="card-footer">

            </div>
        </div >
    );
}

export default ServerConnectFrame