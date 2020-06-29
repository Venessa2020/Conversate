import React from 'react'
import * as Survey from 'survey-react'
import 'survey-react/survey.css'
import Users from './users'

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onComplete = this.onComplete.bind(this)
  }

  onComplete(survey, options) {
    console.log('Survey results: ' + JSON.stringify(survey.data))
    console.log(survey.data)
    this.setState({
      isComplete: true
    })
  }

  render() {
    var json = {
      questions: [
        {
          type: 'matrix',
          name: 'Quiz',
          title:
            'Please indicate if you agree or disagree with the following statements',
          columns: [
            {
              value: 1,
              text: 'Strongly Disagree'
            },
            {
              value: 2,
              text: 'Neutral'
            },
            {
              value: 3,
              text: 'Strongly Agree'
            }
          ],
          rows: [
            {
              value: 'titanic',
              text: 'There was enough space on the door for both Jack and Rose'
            },
            {
              value: 'tigerking',
              text: 'Carole Baskin did not kill her husband'
            },
            {
              value: 'harrypotter',
              text: 'Harry should have ended up with Hermione'
            },
            {
              value: 'got',
              text: 'Tyrion Lannister is actually a Targaryen'
            }
          ]
        }
      ]
    }

    window.survey = new Survey.Model(json)

    const renderSurvey = !this.state.isComplete ? (
      <Survey.Survey
        json={json}
        showCompletedPage={false}
        onComplete={this.onComplete}
      />
    ) : null

    const surveyCompletetion = this.state.isComplete ? (
      <Users json={json} />
    ) : null
    return (
      <div>
        {renderSurvey}
        {surveyCompletetion}
      </div>
    )
  }
}

export default Quiz
