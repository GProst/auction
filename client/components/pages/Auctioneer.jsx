import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import {PageContainer} from '../reusable/PageContainer'
import {Divider} from '../reusable/Divider'
import {ButtonContainer} from '../reusable/ButtonContainer'
import {LowerSection} from '../reusable/LowerSection'
import {Title} from '../reusable/Title'
import {UpperSection} from '../reusable/UpperSection'
import {HomePageLink} from '../reusable/HomePageLink'

import {startAuction, stopAuction} from '../../api'

const FIELD = {
  itemName: 'itemName',
  startingPrice: 'startingPrice'
}

const connector = connect(
  ({auction}) => ({
    isAuctionStarted: auction.isAuctionStarted,
    itemName: auction.itemName,
    startingPrice: auction.startingPrice,
    currentPrice: auction.currentPrice,
    leader: auction.leader
  })
)

class AuctioneerPage extends React.Component {
  static displayName = 'AuctioneerPage'

  static propTypes = {
    isAuctionStarted: PropTypes.bool.isRequired,
    itemName: PropTypes.string.isRequired,
    startingPrice: PropTypes.string,
    currentPrice: PropTypes.string,
    leader: PropTypes.string
  }

  state = {
    loading: false,
    fields: {
      [FIELD.itemName]: '',
      [FIELD.startingPrice]: ''
    },
    errors: {
      [FIELD.itemName]: null,
      [FIELD.startingPrice]: null
    }
  }

  isFormValid() {
    return Object.values(FIELD).reduce((isFormValid, fieldType) => {
      return this.isFieldValid(fieldType, this.state.fields[fieldType]) && isFormValid
    }, true)
  }

  isFieldValid(field, value) {
    let isValid = true
    let error = null
    switch (field) {
      case FIELD.itemName: {
        if (value.length === 0) {
          isValid = false
          error = 'Field can not be empty'
          break
        }
        break
      }
      case FIELD.startingPrice: {
        if (value.length === 0) {
          isValid = false
          error = 'Field can not be empty'
          break
        }
        if (!/^\d+$/.test(value)) {
          isValid = false
          error = 'Should be a number'
          break
        }
        break
      }
    }
    if (!isValid) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [field]: error
        }
      }))
    }
    return isValid
  }

  startAuction = async () => {
    if (this.isFormValid()) {
      const {fields} = this.state
      try {
        this.setState({loading: true})
        await startAuction({
          itemName: fields[FIELD.itemName],
          startingPrice: fields[FIELD.startingPrice]
        })
      } catch(e) {
        console.error(e)
      } finally {
        this.setState({loading: false})
      }
    }
  }

  stopAuction = async () => {
    try {
      this.setState({loading: true})
      await stopAuction()
    } catch(e) {
      console.error(e)
    } finally {
      this.setState({loading: false})
    }
  }

  onInputChange = (event, fieldName) => {
    const {value} = event.target
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [fieldName]: null
      },
      fields: {
        ...prevState.fields,
        [fieldName]: value
      }
    }))
  }

  onInputBlur = (event, fieldName) => {
    const {value} = event.target
    this.isFieldValid(fieldName, value)
  }

  render() {
    const {fields, errors, loading} = this.state
    const {isAuctionStarted} = this.props
    return (
      <PageContainer>
        <HomePageLink />
        <UpperSection>
          <Title>Auctioneer</Title>
          <TextField
            label='Item name'
            disabled={loading || isAuctionStarted}
            error={Boolean(errors[FIELD.itemName])}
            placeholder='Starry Night'
            fullWidth
            value={isAuctionStarted ? this.props.itemName : fields[FIELD.itemName]}
            onChange={e => this.onInputChange(e, FIELD.itemName)}
            onBlur={e => this.onInputBlur(e, FIELD.itemName)}
            margin='normal'
            helperText={errors[FIELD.itemName] || ''}
          />
          <TextField
            label='Starting price'
            disabled={loading || isAuctionStarted}
            error={Boolean(errors[FIELD.startingPrice])}
            placeholder='100'
            fullWidth
            value={isAuctionStarted ? this.props.startingPrice : fields[FIELD.startingPrice]}
            onChange={e => this.onInputChange(e, FIELD.startingPrice)}
            onBlur={e => this.onInputBlur(e, FIELD.startingPrice)}
            margin='normal'
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>
            }}
            helperText={errors[FIELD.startingPrice] || ''}
          />
        </UpperSection>
        <Divider />
        <LowerSection>
          {isAuctionStarted && (
            <>
              <div>Current price:</div>
              <div>${this.props.currentPrice || this.props.startingPrice} - {this.props.leader ? `Bidder ${this.props.leader}` : 'No offers'}</div>
            </>
          )}
          <ButtonContainer>
            <Button
              variant='contained'
              onClick={isAuctionStarted ? this.stopAuction : this.startAuction}
              disabled={loading || (isAuctionStarted ? false : Object.values(errors).some(error => error !== null))}
            >
              {isAuctionStarted ? 'Stop auction' : 'Start auction'}
            </Button>
            {loading && (
              <CircularProgress size={30} style={{marginLeft: 10}} />
            )}
          </ButtonContainer>
        </LowerSection>
      </PageContainer>
    )
  }
}

const ConnectedPage = connector(AuctioneerPage)

export {ConnectedPage as AuctioneerPage}
