import React from 'react';
import { shallow } from 'enzyme';
import LoginButton from './LoginButton';

describe('LoginButton Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<LoginButton />);
        const wrapper = component.find('.NavBarLink');
        expect(wrapper.length).toBe(1);
    })

    //TODO check if jest allows test of top level functions
    //* not possible this way cause the function is not part of the actual component

    // describe('makeNonce function', () => {
    //     it('should return something in nonce', () => {
    //         const component = shallow(<LoginButton />);
    //         const instance = component.instance();
    //         expect(typeof instance.makeNonce(9)).toBe('string');
    //     })
    //     it('should return the expected length', () => {
    //         const component = shallow(<LoginButton />);
    //         const instance = component.instance();
    //         expect(instance.makeNonce(10).length).toBe(10);
    //     })
    // })
});