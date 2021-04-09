import React from 'react';
import { shallow } from 'enzyme';
import DownloadSection from './DownloadSection';

describe('DownloadSection Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<DownloadSection plot={{}} loggedIn={true}/>);
        const wrapper = component.find('.download-section');
        expect(wrapper.length).toBe(1);
    })
    it('should have downloads button active when logged in', () => {
        const component = shallow(<DownloadSection plot={{}} loggedIn={true}/>);
        const loggedInButtons = component.find('mat-style-accent-disabled');
        expect(loggedInButtons.length).toBe(0);
    })
    it('Should have download buttons disabled when not logged in', () => {
        const component = shallow(<DownloadSection plot={{}} loggedIn={false}/>);
        const loggedInButtons = component.find('button[data-md-tooltip="Not logged in"]');
        expect(loggedInButtons.length).toBe(2);
    })
});