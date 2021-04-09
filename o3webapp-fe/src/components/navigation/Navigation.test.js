import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<Navigation loginRedirect={true} />);
        const wrapper = component.find('.NavBar');
        expect(wrapper.length).toBe(1);
    })
});