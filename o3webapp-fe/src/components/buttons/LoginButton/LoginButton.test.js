import React from 'react';
import { shallow } from 'enzyme';
import LoginButton from './LoginButton';

describe('LoginButton Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<LoginButton />);
        const wrapper = component.find('.NavBarLink');
        expect(wrapper.length).toBe(1);
    })
});