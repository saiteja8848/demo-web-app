import React, { Component } from "react";

import { Line } from "react-chartjs-2";

function LineChart2(props) {
	const data = {
		labels: ["2001", "2002", "2003", "2004", "2005", "2006", "2007"],
		datasets: [
			{
				label: "Interest Over time",
				data: props.data,
				borderColor: ["rgba(54,162,235,0.2)"],
				backgroundColor: ["rgba(54,162,235,0.2)"],
				pointBackgroundColor: "rgba(54,162,235,0.2)",
				pointBorderColor: "rgba(54,162,235,0.2)",
			},
		],
	};

	//SCALING PART
	const options = {
		title: {
			display: true,
			text: "Line Chart",
		},
		scales: {
			yAxes: [
				{
					ticks: {
						min: 0,
						max: 100,
						stepSize: 25,
					},
				},
			],
		},
	};

	return <Line data={data} options={options} />;
}

class LineChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			label: [],
			data: [],
		};
	}

	componentDidMount() {
		setInterval(this.loadData, 40000);
	}

	loadData = () => {
		this.setState({
			label: [],
			data: [],
		});
		fetch(
			`http://javatechiecruddynamodb-env.eba-entwyq7a.ap-south-1.elasticbeanstalk.com/getCategorys`
		)
			.then((res) => res.json())
			.then((res) => {
				res.forEach((abc) => {
					this.setState({
						label: [...this.state.label, abc.date],
						data: [...this.state.data, abc.score],
					});
				});
			});
	};

	render() {
		return <LineChart2 label={this.state.label} data={this.state.data} />;
	}
}

export default LineChart;
