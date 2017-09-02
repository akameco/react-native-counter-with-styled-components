// @flow
import * as React from 'react'
import { TouchableHighlight } from 'react-native'
import { css } from 'styled-components'
import styled from 'styled-components/native'

const center = css`
  justify-content: center;
  align-items: center;
`

const inline = css`
  flex-direction: row;
  align-items: flex-end;
`

const Container = styled.View`
  flex: 1;
  ${center};
  background-color: #f5fcff;
`

const Panel = styled.View`
  margin-top: 30px;
  ${p => p.inline && inline};
`

const Block = styled.Text`
  font-weight: bold;
  align-self: flex-end;
`

const NumberBlock = Block.extend`
  font-size: 100px;
  text-align: center;
`

const UnitBlock = Block.extend`font-size: 16px;`

const Button = styled(TouchableHighlight).attrs({
  underlayColor: p => (p.add ? '#ffc1d6' : '#d0dff9'),
})`
  ${center};
  height: 50px;
  margin: 10px;
  border-radius: 10px;
  border-color: ${p => (p.add ? '#f69' : '#6495ed')};
  border-width: 2px;
  padding-left: 10px;
  padding-right: 10px;
`

const SmallButton = Button.extend`height: 40px;`

const StyledText = styled.Text`
  color: ${p => (p.add ? '#f69' : '#6495ed')};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const delay = (ms: number = 1000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

class Counter extends React.Component<{}, { count: number }> {
  state = { count: 0 }
  _changeCount = n => {
    this.setState({ count: this.state.count + n })
  }
  increment = () => this._changeCount(+1)
  decrement = () => this._changeCount(-1)
  incrementIfOdd = () => {
    if (this.state.count % 2 !== 0) {
      this.increment()
    }
  }
  incrementAsync = async () => {
    await delay()
    this.increment()
  }
  decrementAsync = async () => {
    await delay()
    this.decrement()
  }
  render() {
    return (
      <Container>
        <Panel inline>
          <NumberBlock>{this.state.count}</NumberBlock>
          <UnitBlock>/ times</UnitBlock>
        </Panel>
        <Panel inline>
          <SmallButton add onPress={this.increment}>
            <StyledText add>+</StyledText>
          </SmallButton>
          <SmallButton onPress={this.decrement}>
            <StyledText>-</StyledText>
          </SmallButton>
        </Panel>
        <Panel>
          <Button add onPress={this.incrementIfOdd}>
            <StyledText add>Increment if odd</StyledText>
          </Button>
          <Button add onPress={this.incrementAsync}>
            <StyledText add>Increment async</StyledText>
          </Button>
          <Button onPress={this.decrementAsync}>
            <StyledText>Decrement async</StyledText>
          </Button>
        </Panel>
      </Container>
    )
  }
}

export default Counter
