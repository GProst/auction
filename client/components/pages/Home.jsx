import React from 'react'
import styled from 'styled-components'
import {Link as _Link} from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {ROUTES} from '../../routes'

import {PageContainer} from '../reusable/PageContainer'

const Link = styled(_Link)`
  text-decoration: none;
  color: inherit;
  padding: 8px 16px;
`

const BidderLinkContainer = styled.div`
  display: flex;
  align-items: center;
`

export class HomePage extends React.Component {
  static displayName = 'HomePage'

  state = {
    bidderId: ''
  }

  onBidderIdChange = e => {
    this.setState({
      bidderId: e.target.value
    })
  }

  render() {
    const {bidderId} = this.state

    return (
      <PageContainer>
        <Button variant='contained' style={{padding: 0, marginBottom: 30}}>
          <Link to={ROUTES.auctioneer}>
            Go to Auctioneer page
          </Link>
        </Button>
        <BidderLinkContainer>
          <Button variant='contained' disabled={!bidderId} style={{padding: 0, marginRight: 20}}>
            <Link to={ROUTES.bidder.getRouteByID(bidderId)}>
              Go to Bidder page
            </Link>
          </Button>
          <TextField
            label='Bidder ID'
            placeholder='13'
            value={bidderId}
            onChange={this.onBidderIdChange}
            style={{marginBottom: 10}}
          />
        </BidderLinkContainer>
      </PageContainer>
    )
  }
}
