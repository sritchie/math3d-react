import React from 'react'
import LongPressable from './index'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// TODO Move this somewhere better, or find it in a library?
/**
 * Creates a Promise that is resolved after delay.
 * Good for using with async/await
 *
 * @param  {number} delay in milliseconds
 */
function timeout(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

Enzyme.configure( { adapter: new Adapter() } )

describe('<LongPressable />', () => {

  it('fires onLongPress and not onShortPress when long-pressed', async() => {
    const onLongPress = jest.fn()
    const onShortPress = jest.fn()
    const downEvent = { }
    const upEvent = { }
    const longPressTime = 300

    const wrapper = shallow(
      <LongPressable
        onShortPress={onShortPress}
        onLongPress={onLongPress}
        longPressTime={longPressTime}
      />
    )
    wrapper.instance().onPointerDown(downEvent)
    await timeout(longPressTime + 1)
    wrapper.instance().onPointerUp(upEvent)
    expect(onShortPress).toHaveBeenCalledTimes(0)
    expect(onLongPress).toHaveBeenCalledTimes(1)
  } )

  // Other tests to add:
  // calls onShortPress (and not onLongPress) when press is onShortPress
  //
  // regarding dragging:
  //  it might be nice to have a prop dragThreshhold such that the
  //  callbacks are fired if and only if pointer movement is less toHaveBeenCalledTimes
  //  dragThreshhold. In which case, also add tests for:
  //
  //  calls onShortPress / onLongPress as appropriate when press is short AND movement is small
  //  does NOT call onShortPress / onLongPress when press is short/long AND movement is large (dragging)

} )
