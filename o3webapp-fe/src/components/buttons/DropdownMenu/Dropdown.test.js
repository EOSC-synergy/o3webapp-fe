import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<Dropdown title={"dropdown-title"} resetThenSet={() => {}} list={[{}]} />);
        const wrapper = component.find('.dropdown-wrapper');
        expect(wrapper.length).toBe(1);
    })
    it('should opening the dropdown', () => {
        const component = shallow(<Dropdown title={"dropdown-title"} resetThenSet={() => {}} list={[{ id: 1}]} />);
        const wrapper = component.find('.dropdown-header');
        expect(component.state('isOpened')).toBe(false);
        wrapper.simulate('click');
        expect(component.state('isOpened')).toBe(true);
    })
    it('renders the correct title', () => {
        const component = shallow(<Dropdown title={"dropdown-title"} resetThenSet={() => {}} list={[{ id: 1}]} />);
        const wrapper = component.find('.dropdown-header-title');
        expect(wrapper.text()).toBe('dropdown-title');
    })
    it('selecting an item should update the state', () => {
        const component = shallow(<Dropdown title={"dropdown-title"} resetThenSet={() => {}} list={[{ id: 1, title: "mock-item", key: "mock-item-key"}]} />);
        //expand list first
        const outerButton = component.find('.dropdown-header');
        outerButton.simulate('click');

        //then find inner list item (since we can give this as prop it should only be one)
        const innerButton = component.find('.dropdown-list-item');
        expect(innerButton.length).toBe(1);
        innerButton.simulate('click');
        expect(component.state('isOpened')).toBe(false);
        expect(component.state('headerTitle')).toBe('mock-item');
    })
});