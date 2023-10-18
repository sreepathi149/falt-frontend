import { Card, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import CanvasJSReact from '@canvasjs/react-charts';
import jwtDecode from "jwt-decode";

const TasksGraph = () => {
    const data = useSelector((state) => {
        return state.data.data
    })
    
    const tokenData = jwtDecode(localStorage.getItem('token'))
    const tasks = data.tasks
    const tasksM = data.tasks.filter(task => task.assignedBy === tokenData.id )
    const tasksF = data.tasks.filter(task => task.assignedTo === tokenData.id)

    const pendingTasks = tasks.filter(task => task.status === 'pending')
    const completedTasks = tasks.filter(task => task.status === 'completed')
    const delayedTasks = tasks.filter(task => task.status === 'delayed')
    // < ------------------- manager --------------------------->
    const pendingTasksM = tasksM.filter(task => task.status === 'pending')
    const completedTasksM = tasksM.filter(task => task.status === 'completed')
    const delayedTasksM = tasksM.filter(task => task.status === 'delayed')
    // < ------------------- fieldAgents --------------------------->
    const pendingTasksF = tasksF.filter(task => task.status === 'pending')
    const completedTasksF = tasksF.filter(task => task.status === 'completed')
    const delayedTasksF = tasksF.filter(task => task.status === 'delayed')

    const pT = pendingTasks.length/tasks.length * 100
    const cT = completedTasks.length/tasks.length * 100
    const dT = delayedTasks.length/tasks.length * 100

    const pTM = pendingTasksM.length/tasks.length * 100
    const cTM = completedTasksM.length/tasks.length * 100
    const dTM = delayedTasksM.length/tasks.length * 100

    const pTF = pendingTasksF.length/tasks.length * 100
    const cTF = completedTasksF.length/tasks.length * 100
    const dTF = delayedTasksF.length/tasks.length * 100

    const randomNumber = Math.floor(Math.random() * 10)
    const randomNumber1 = Math.floor(Math.random() * 10)
    const randomNumber2 = Math.floor(Math.random() * 10)

    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title:{
            text: "Monthly Progress",
            fontColor: "red"
        },
        axisY: {
            includeZero: true,
            title: "No Of Tasks",
            titleFontColor: "red",
            lineThickness: 1,
            labelFontColor: "green"
        },
        axisX:{
            labelFontColor: "orange"
        },
        data: [{       
            click: function(e){
              alert(`Delayed Tasks till ${e.dataPoint.label} is ${e.dataPoint.y}`);
            }, 
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "5A5757",
            indexLabelPlacement: "outside",
            name: "Delayed",
            showInLegend: true,
            dataPoints: [
               {label: "Jan", y: randomNumber1},
               {label: "Feb", y: randomNumber},
               {label: "Mar", y: randomNumber2},
               {label: "Apr", y: randomNumber},
               {label: "May", y: randomNumber2},
               {label: "Jun", y: randomNumber1},
               {label: "Jul", y: randomNumber},
               {label: "Aug", y: randomNumber2},
               {label: "Sep", y: randomNumber},
               {label: "Oct", y: randomNumber1},
               {label: "Nov", y: 0},
               {label: "Dec", y: 0}
               
            ]
        },
        {
            click: function(e){
                alert( `Completed Tasks till ${e.dataPoint.label} is ${e.dataPoint.y}` );
            },
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            name: "Completed",
            showInLegend: true,
            dataPoints: [
                {label: "Jan", y: randomNumber1},
                {label: "Feb", y: randomNumber2},
                {label: "Mar", y: randomNumber},
                {label: "Apr", y: randomNumber1},
                {label: "May", y: randomNumber2},
                {label: "Jun", y: randomNumber},
                {label: "Jul", y: randomNumber2},
                {label: "Aug", y: randomNumber1},
                {label: "Sep", y: randomNumber1},
                {label: "Oct", y: randomNumber},
                {label: "Nov", y: 0},
                {label: "Dec", y: 0},
                
            ]
        },
        {
            click: function(e){
                alert(`Pending Tasks till ${e.dataPoint.label} is ${e.dataPoint.y}`);
            },
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            name: "Pending",
            showInLegend: true,
            dataPoints: [
               {label: "Jan", y: randomNumber2},
               {label: "Feb", y: randomNumber1},
               {label: "Mar", y: randomNumber2},
               {label: "Apr", y: randomNumber1},
               {label: "May", y: randomNumber2},
               {label: "Jun", y: randomNumber},
               {label: "Jul", y: randomNumber1},
               {label: "Aug", y: randomNumber2},
               {label: "Sep", y: randomNumber1},
               {label: "Oct", y: randomNumber},
               {label: "Nov", y: 0},
               {label: "Dec", y: 0},
               
            ]
        }
        ]
    }

        const optionsA = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Task Progress",
                fontColor: "auqamarine"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",
                showInLegend: true,		
				startAngle: -90,
				dataPoints: [
					{ y: pT, label: "pending" },
					{ y: cT, label: "Completed" },
					{ y: dT, label: "delayed" }	
				]
			}]
        }       
        const optionsM = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Task Progress",
                fontColor: "auqamarine"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",
                showInLegend: true,		
				startAngle: -90,
				dataPoints: [
					{ y: pTM, label: "pending" },
					{ y: cTM, label: "Completed" },
					{ y: dTM, label: "delayed" }	
				]
			}]
        }       
        const optionsF = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Task Progress",
                fontColor: "auqamarine"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",
                showInLegend: true,		
				startAngle: -90,
				dataPoints: [
					{ y: pTF, label: "pending" },
					{ y: cTF, label: "Completed" },
					{ y: dTF, label: "delayed" }	
				]
			}]
        }       
    return(
        <div>
            {tokenData.role === 'admin' ? <Container fluid>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <CanvasJSChart options = {optionsA} 
                                    /* onRef={ref => this.chart = ref} */
                                    /* containerProps={{ width: '100%', height: '300px' }} */
                                />
                            </Col>
                            <Col>
                                <CanvasJSChart options = {options} 
                                    /* onRef={ref => this.chart = ref} */
                                    /* containerProps={{ width: '100%', height: '300px' }} */
                                />
                            </Col>    
                        </Row>    
                    </Card.Body>    
                </Card>    
            </Container> : null }
            {tokenData.role === 'manager' ? <Container fluid>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <CanvasJSChart options = {optionsM} 
                                    /* onRef={ref => this.chart = ref} */
                                    /* containerProps={{ width: '100%', height: '300px' }} */
                                />
                            </Col>
                            <Col>
                                <CanvasJSChart options = {options} 
                                    /* onRef={ref => this.chart = ref} */
                                    /* containerProps={{ width: '100%', height: '300px' }} */
                                />
                            </Col>    
                        </Row>    
                    </Card.Body>    
                </Card>    
            </Container> : null }
            {tokenData.role === 'fieldAgent' ? <Container fluid>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <CanvasJSChart options = {optionsF} 
                                    /* onRef={ref => this.chart = ref} */
                                    /* containerProps={{ width: '100%', height: '300px' }} */
                                />
                            </Col>
                            <Col>
                                <CanvasJSChart options = {options} 
                                    /* onRef={ref => this.chart = ref} */
                                    /* containerProps={{ width: '100%', height: '300px' }} */
                                />
                            </Col>    
                        </Row>    
                    </Card.Body>    
                </Card>    
            </Container> : null }
        </div>
    )
}

export default TasksGraph