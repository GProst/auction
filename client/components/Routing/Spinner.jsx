import React from 'react'
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export class Spinner extends React.Component {
  static displayName = 'Spinner'

  render() {
    return (
      <Container>
        <CircularProgress size={50} />
      </Container>
    )
  }
}
