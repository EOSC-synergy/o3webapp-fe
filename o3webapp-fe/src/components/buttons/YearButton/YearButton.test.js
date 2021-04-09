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

    // function mockChangeUpdate(year) {
    //     return year
    // }
    // it('should call callback function onClick with correct value', () => {
    //     const component = shallow(<YearButton handleYearChange={mockChangeUpdate} year={1970} bound={"lower"} />);
    //     const input = component.find('input');
    //     input.simulate('change', { target: { value: '1980'}});
    //     expect(handleYearChange).toHave
    // })
});