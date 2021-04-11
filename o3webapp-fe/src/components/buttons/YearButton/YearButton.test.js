import React from 'react';
import { shallow } from 'enzyme';
import YearButton from './YearButton';

describe('YearButton Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<YearButton handleYearChange={() => {}} year={1970} bound={"lower"} />);
        const wrapper = component.find('.year-button-wrapper');
        expect(wrapper.length).toBe(1);
    })
    it('should render correct props', () => {
        const component = shallow(<YearButton handleYearChange={() => {}} year={1970} bound={"lower"} />);
        const legend = component.find('legend');
        expect(legend.text()).toBe("Enter lower Year!");
    })
});