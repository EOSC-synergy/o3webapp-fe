# -*- coding: utf-8 -*-
#
# Copyright (c) 2017 - 2019 Karlsruhe Institute of Technology - Steinbuch Centre for Computing
# This code is distributed under the MIT License
# Please, see the LICENSE file
#

import unittest
import urllib.request

class TestPackageMethods(unittest.TestCase):
    """ Class to unit tests
    """
    # Placeholder for tests
    def setUp(self):
        self.FakeTest = True
        # o3api URL: better use a (global) configurable setting!
        self.o3api_url = "http://o3api.test.fedcloud.eu:30505/api/ui/"
        

    def test_faketest_type(self):
        """Test of the variable FakeTest
        """
        self.assertTrue(type(self.FakeTest) is bool)

    def test_o3api_up(self):
        """Test if o3api is reachable (Example!)
        """
        status_code = urllib.request.urlopen(self.o3api_url).getcode()
        o3api_is_reachable = status_code == 200
        self.assertTrue(o3api_is_reachable)
