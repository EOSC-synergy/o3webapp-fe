import React from 'react';
import { shallow } from 'enzyme';
import LogoutButton from './LogoutButton';

describe('LogoutButton Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<LogoutButton loggedOut={() => {}}/>);
        const wrapper = component.find('.NavBarLink');
        expect(wrapper.length).toBe(1);
    })
});