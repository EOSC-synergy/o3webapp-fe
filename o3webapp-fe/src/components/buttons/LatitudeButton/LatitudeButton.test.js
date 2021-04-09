import React from 'react';
import { shallow } from 'enzyme';
import LatitudeButton from './LatitudeButton';

describe('LatitudeButton Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<LatitudeButton handleChange={() => {}} />);
        const wrapper = component.find('.latitude-button-wrapper');
        expect(wrapper.length).toBe(1);
    })
    it('should render the dropdown', () => {
        const component = shallow(<LatitudeButton handleChange={() => {}} />);
        const wrapper = component.find('Dropdown');
        expect(wrapper.length).toBe(1);
    })
    it('should not render the custom field by default', () => {
        const component = shallow(<LatitudeButton handleChange={() => {}} />);
        const wrapper = component.find('.custom-input-wrapper');
        expect(wrapper.length).toBe(0);
    })
    it('should render the custom field when it gets selected', () => {
        const component = shallow(<LatitudeButton handleChange={() => {}} />);
        //fire callback to simulate it getting selected
        component.instance().resetThenSet(7, 'latitude');
        const wrapper = component.find('.custom-input-wrapper');
        expect(wrapper.length).toBe(1);
    })
    it('setting an input value in custom should work', () => {
        const component = shallow(<LatitudeButton handleChange={() => {}} />);
        //fire callback to simulate it getting selected
        component.instance().resetThenSet(7, 'latitude');
        //simulate input and check that is was stored correctly into the state
        const input = component.find('.custom-input-wrapper fieldset input');
        input.simulate('change', { target: { value: '-89, -1'}});
        expect(component.state('latitude')[7].value).toStrictEqual([-89, -1]);
    })
});