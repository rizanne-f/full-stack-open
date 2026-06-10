import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.value[3] !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={props.value[0]} />
          <StatisticLine text="Neutral" value={props.value[1]} />
          <StatisticLine text="Bad" value={props.value[2]} />
          <StatisticLine text="All" value={props.value[3]} />
          <StatisticLine text="Average" value={props.value[4]} />
          <StatisticLine text="Positive" value={props.value[5]} />
        </tbody>
      </table>
    )
  }
  return <div>No feedback given</div>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = ((good*1) + (neutral*0) + (bad*-1)) / (total)
  const positive = (good/total) * 100 + " %"

  const handleSetGood = () => { setGood(good + 1) }
  const handleSetNeutral = () => { setNeutral(neutral + 1) }
  const handleSetBad = () => { setBad(bad + 1) }

	return (
		<div>
			<h1>Give Feedback</h1>
			<div>
				<Button onClick={handleSetGood} text="Good" />
	      <Button onClick={handleSetNeutral} text="Neutral" />
	      <Button onClick={handleSetBad} text="Bad" />
			</div>

      <h1>Statistics</h1>
      <Statistics value={[good, neutral, bad, total, average, positive]}/>
		</div>
	)
}

export default App