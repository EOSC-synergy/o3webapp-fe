import React from 'react';
import { shallow } from 'enzyme';
import NavigationTab from './NavigationTab';

describe('NavigationTab Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<NavigationTab state={"test-find"} pageLink={"/url"} name={"hello"} handleClick={() => {}}/>);
        const wrapper = component.find('.test-find');
        expect(wrapper.length).toBe(1);
    })
    it('should render the Link correctly', () => {
        const component = shallow(<NavigationTab state={"test-find"} pageLink={"/url"} name={"hello"} handleClick={() => {}}/>);
        const wrapper = component.find('Link[to="/url"]');
        expect(wrapper.length).toBe(1);
    })
});