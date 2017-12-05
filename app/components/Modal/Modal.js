import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css'
import { formatDuck } from '../../helpers/utils'
const { object, string, func, bool } = PropTypes

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const Modal = (props) => {
  const submitDuck = () => {
    return props.duckFanout(formatDuck(props.duckText, props.user))
  }

  return (
    <div>
      <span className={darkBtn} onClick={props.openModal}>
        Duck
      </span>
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}
        ariaHideApp={false}>
        <div className={newDuckTop}>
          <span>Compose new Duck</span>
          <span onClick={props.closeModal} className={pointer}>X</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={e => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            className={newDuckInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
          Duck
        </button>
      </ReactModal>
    </div>
  )
}

Modal.propTypes = {
  duckText: string.isRequired,
  closeModal: func.isRequired,
  isOpen: bool.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  updateDuckText: func.isRequired,
  user: object.isRequired,
  duckFanout: func.isRequired,
}

export default Modal
