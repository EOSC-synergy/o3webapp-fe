import React from 'react';
import { shallow } from 'enzyme';
import PlotButtonController from './PlotButtonController';

describe('PlotButtonController Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<PlotButtonController handleChange={() => {}} />);
        const wrapper = component.find('Radio');
        expect(wrapper.length).toBe(1);
    })
    it('should render inner Radio without crashing', () => {
        const component = shallow(<PlotButtonController handleChange={() => {}} />);
        const radiocomponent = component.find('Radio').shallow();
        const wrapper = radiocomponent.find('.plot-selection-wrapper');
        expect(wrapper.length).toBe(1);
    })
    it('should update state to the correct plot when selected', () => {
        const component = shallow(<PlotButtonController handleChange={() => {}} />);
        expect(component.state('plotTypes')[2].selected).toBe(false);
        const radiocomponent = component.find('Radio').shallow();
        const button = radiocomponent.find('.radio-list-item').at(2);
        button.simulate('click');
        expect(component.state('plotTypes')[2].selected).toBe(true);
    })
});