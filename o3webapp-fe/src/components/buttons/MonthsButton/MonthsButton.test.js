import React from 'react';
import { shallow } from 'enzyme';
import MonthsButton from './MonthsButton';

describe('MonthsButton Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<MonthsButton handleChange={() => {}} />);
        const wrapper = component.find('.month-button-wrapper');
        expect(wrapper.length).toBe(1);
    })
    it('should render the dropdown', () => {
        const component = shallow(<MonthsButton handleChange={() => {}} />);
        const wrapper = component.find('Dropdown');
        expect(wrapper.length).toBe(1);
    })
    it('should not render the custom field by default', () => {
        const component = shallow(<MonthsButton handleChange={() => {}} />);
        const wrapper = component.find('.custom-input-wrapper');
        expect(wrapper.length).toBe(0);
    })
    it('should render the custom field when it gets selected', () => {
        const component = shallow(<MonthsButton handleChange={() => {}} />);
        //fire callback to simulate it getting selected
        component.instance().resetThenSet(4, 'season');
        const wrapper = component.find('.custom-input-wrapper');
        expect(wrapper.length).toBe(1);
    })
    it('setting an input value in custom should work', () => {
        const component = shallow(<MonthsButton handleChange={() => {}} />);
        //fire callback to simulate it getting selected
        component.instance().resetThenSet(4, 'season');
        //simulate input and check that is was stored correctly into the state
        const input = component.find('.custom-input-wrapper fieldset input');
        input.simulate('change', { target: { value: '3, 6, 7'}});
        expect(component.state('season')[4].value).toStrictEqual([3, 6, 7]);
    })
});