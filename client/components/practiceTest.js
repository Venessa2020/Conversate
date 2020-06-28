import React from 'react'
import * as Survey from 'survey-react'
import 'survey-react/survey.css'
import Users from './users'

class PracticeTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onComplete = this.onComplete.bind(this)
    //this.sendDataToServer = this.sendDataToServer.bind(this)
  }
  //   onComplete() {
  //     this.sendDataToServer()
  //     this.setState({
  //       isComplete: true,
  //     })
  //   }
  onComplete(survey, options) {
    //     //Write survey results into database
    console.log('Survey results: ' + JSON.stringify(survey.data))
    console.log(survey.data)
    this.setState({
      isComplete: true
    })
  }

  render() {
    const json = {
      title: 'Cancellation Survey',
      description:
        'Thank you for using our service. We would highly appreciate if you would take the time to fill our cancellation survey. This would help us improve the service.',
      pages: [
        {
          name: 'page1',
          elements: [
            {
              type: 'radiogroup',
              name: 'using_duration',
              title: 'How long have you been using the service?',
              choices: [
                'Less than a month',
                '1-6 months',
                '7-12 months',
                '1-3 years',
                'Over 3 years'
              ]
            },
            {
              type: 'radiogroup',
              name: 'using_frequency',
              title: 'How often did you use the service?',
              choices: [
                'Once a week',
                '2 or 3 times a month',
                'Once a month',
                'Less than once a month'
              ]
            },
            {
              type: 'radiogroup',
              name: 'cancel_reason',
              title: 'What was the main reason for cancelling the service?',
              hasOther: true,
              choices: [
                'No longer need it',
                "It didn't meet my needs",
                'Found a better alternative',
                'Found a cheaper alternative',
                'Quality was less than expected',
                'Ease of use was less than expected',
                'Access to the service was less than expected',
                'Customer service was less than expected'
              ]
            },
            {
              type: 'radiogroup',
              name: 'satisfaction',
              title: 'Overall, how satisfied were you with the service?',
              choices: [
                'Very Satisfied',
                'Satisfied',
                'Neutral',
                'Unsatisfied',
                'Very Unsatisfied'
              ]
            },
            {
              type: 'matrix',
              name: 'future_using',
              titleLocation: 'hidden',
              columns: [
                'Definitely',
                'Probably',
                'Not Sure',
                'Probably Not',
                'Definitely Not'
              ],
              rows: [
                {
                  value: 'use_in_future',
                  text: 'Will you use our service in the future?'
                },
                {
                  value: 'recommend',
                  text: 'Will you recommend our service to others?'
                }
              ]
            },
            {
              type: 'comment',
              name: 'service_improvements',
              title: 'How can we improve our service?'
            }
          ]
        }
      ],
      showQuestionNumbers: 'off'
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

export default PracticeTest
// //In your react App.js or yourComponent.js file add these lines to import
// import * as Survey from 'survey-react'
// import 'survey-react/survey.css'

// class PracticeTest extends React.Component {
//   //Define Survey JSON
//   //Here is the simplest Survey with one text question
//   json = {
//     elements: [
//       {
//         type: 'text',
//         name: 'customerName',
//         title: 'What is your name?',
//         isRequired: true,
//       },
//     ],
//   }

//   //Define a callback methods on survey complete
//   onComplete(survey, options) {
//     //Write survey results into database
//     console.log('Survey results: ' + JSON.stringify(survey.data))
//   }
//   render() {
//     //Create the model and pass it into react Survey component
//     //You may create survey model outside the render function and use it in your App or component
//     //The most model properties are reactive, on their change the component will change UI when needed.
//     var model = new Survey.Model(this.json)
//     return <Survey.Survey model={model} onComplete={this.onComplete} />
//     /*
//   //The alternative way. react Survey component will create survey model internally
//   return (<Survey.Survey json={this.json} onComplete={this.onComplete}/>);
//   */
//     //You may pass model properties directly into component or set it into model
//     // <Survey.Survey model={model} mode="display"/>
//     //or
//     // model.mode="display"
//     // <Survey.Survey model={model}/>
//     // You may change model properties outside render function.
//     //If needed react Survey Component will change its behavior and change UI.
//   }
// }

// export default PracticeTest
