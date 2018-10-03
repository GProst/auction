import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import {PageContainer} from '../reusable/PageContainer'
import {Divider} from '../reusable/Divider'
import {ButtonContainer} from '../reusable/ButtonContainer'
import {LowerSection} from '../reusable/LowerSection'
import {Title} from '../reusable/Title'
import {UpperSection} from '../reusable/UpperSection'

import {submitOffer} from '../../api'

const ItemName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 0 10px;
`

const CurrentPrice = styled.div`
  font-size: 16px;
  line-height: 1.5;
`

const connector = connect(
  ({auction}) => ({
    isAuctionStarted: auction.isAuctionStarted,
    itemName: auction.itemName,
    startingPrice: auction.startingPrice,
    currentPrice: auction.currentPrice,
    leader: auction.leader,
    offerors: auction.offerors
  })
)

class BidderPage extends React.Component {
  static displayName = 'BidderPage'

  static propTypes = {
    isAuctionStarted: PropTypes.bool.isRequired,
    itemName: PropTypes.string.isRequired,
    startingPrice: PropTypes.string,
    currentPrice: PropTypes.string,
    leader: PropTypes.string,
    offerors: PropTypes.array,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  state = {
    loading: false
  }

  submitOffer = async offerPrice => {
    try {
      const {match: {params: {id: bidderId}}} = this.props
      this.setState({loading: true})
      await submitOffer({offerPrice, bidderId})
    } catch(e) {
      console.error(e)
    } finally {
      this.setState({loading: false})
    }
  }

  render() {
    const {loading} = this.state
    const {isAuctionStarted, itemName, offerors, currentPrice, startingPrice, leader, match: {params: {id: bidderId}}} = this.props
    const isLeader = leader === bidderId
    const isOfferor = offerors.includes(bidderId)
    const offerPrice = (Number(currentPrice || startingPrice) + 100).toString()
    return (
      <PageContainer>
        <UpperSection style={{width: 'auto'}}>
          <Title>Bidder {bidderId}</Title>
          {isAuctionStarted && (
            <>
              <ItemName>{itemName}</ItemName>
              <CurrentPrice>
                Current price:<br />
                ${currentPrice || startingPrice} - {leader ? `Bidder ${leader}` : 'No offers'}
              </CurrentPrice>
            </>
          )}
        </UpperSection>
        <Divider />
        <LowerSection>
          {isAuctionStarted
            ? (
              <ButtonContainer>
                <Button
                  variant='contained'
                  onClick={e => { this.submitOffer(offerPrice) }}
                  disabled={loading || isLeader}
                >
                  {isLeader
                    ? `You bid $${currentPrice}`
                    : isOfferor
                      ? `Bid again $${offerPrice}`
                      : `Bid $${offerPrice}`
                  }
                </Button>
                {loading && (
                  <CircularProgress size={30} style={{marginLeft: 10}} />
                )}
              </ButtonContainer>
            )
            : (
              <div>
                Auction is not started
              </div>
            )
          }
        </LowerSection>
      </PageContainer>
    )
  }
}

const ConnectedPage = connector(BidderPage)

export {ConnectedPage as BidderPage}
