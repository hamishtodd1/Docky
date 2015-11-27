//the fivefold axis is at (39.024, 62.544, 0.215), or rather along (1,PHI,0). origin at (0,0,0). 3 fold axis is along 1,1,1
//A twofold axis is at (1+PHI, PHI, 1). 
//you may want to cut off the "tail" from the beginning of the first beta sheet, @/serialNumber<354 gets us those atoms
//carbon and nitrogen: all the backbone and some of the residue and few dead ends

//Orthographic camera should be used by this (because sprites don't need scaling) and by crystal viewer, because maybe nice projection of 2D penrose tiling

//

//you may want to add some "capsomers", just a raised part at the corners

//For the 1CWP chain B, it looks like we want to get rid of @/serialNumber<1225 and @/serialNumber>2280

var protein_vertices_numbers = new Float32Array([
	24.255,51.648,34.746,
	25.813,50.2,31.559,
	27.177,53.007,29.374,
	29.297,54.098,26.392,
	31.1,57.261,27.539,
	32.589,59.637,24.941,
	35.413,62.044,25.933,
	38.564,63.562,24.436,
	42.152,63.807,25.676,
	45.018,66.082,24.556,
	48.165,64.255,23.445,
	51.678,65.551,22.735,
	53.953,64.179,20.001,
	56.146,61.243,21.109,
	54.744,61.19,24.628,
	52.328,58.64,26.037,
	49.291,60.022,27.858,
	47.849,57.98,30.77,
	44.019,58.222,30.664,
	42.586,58.559,34.201,
	39.487,56.63,35.23,
	38.395,59.862,37.025,
	37.428,61.236,33.601,
	34.392,58.895,33.565,
	32.766,60.445,36.678,
	31.162,63.73,35.743,
	27.854,65.596,35.784,
	28.424,65.938,31.975,
	27.677,62.184,31.67,
	25.149,61.981,34.577,
	27.738,59.837,36.446,
	29.025,62.12,39.233,
	27.149,60.023,41.852,
	29.31,56.919,41.16,
	32.739,56.277,42.721,
	33.616,53.011,40.919,
	33.341,51.622,37.421,
	34.057,48.322,35.669,
	35.579,48.938,32.227,
	34.644,46.431,29.506,
	36.17,47.871,26.322,
	38.036,50.91,25.057,
	37.892,52.37,21.535,
	39.915,55.383,20.362,
	39.882,57.643,17.306,
	42.214,60.466,16.283,
	40.255,63.734,16.733,
	42.328,66.381,14.902,
	44.242,66.219,11.586,
	47.755,64.674,11.507,
	51.624,67.491,7.059,
	52.517,64.5,4.797,
	51.396,61.91,7.371,
	48.493,59.544,7.893,
	46.915,59.531,11.354,
	47.78,56.772,13.831,
	46.64,55.911,17.363,
	48.084,53.303,19.768,
	46.568,51.943,22.977,
	48.433,50.204,25.793,
	46.159,48.589,28.449,
	46.956,49.412,32.101,
	45.828,47.324,35.113,
	46.301,47.714,38.885,
	47.492,44.064,39.129,
	50.084,44.52,36.327,
	50.331,46.642,33.193,
	50.283,45.116,29.73,
	52.908,45.832,27.067,
	50.587,45.34,24.055,
	47.247,47.931,19.709,
	47.493,50.297,16.76,
	45.284,51.667,14.012,
	46.447,53.846,11.098,
	44.362,55.772,8.557,
	44.569,54.855,4.848,
	43.348,58.296,3.642,
	45.1,61.389,5.092,
	41.728,63.096,5.645,
	40.334,60.229,7.739,
	40.515,59.258,11.407,
	42.71,56.4,12.589,
	41.001,54.046,15.114,
	41.631,50.986,17.289,
	40.21,49.374,20.416,
	40.686,46.549,22.867,
	38.442,44.382,24.974,
	39.128,43.557,28.637,
	38.564,39.853,29.452,
	36.164,38.834,32.277,
	39.016,37.838,34.601,
	40.377,41.396,34.486,
	37.028,43.191,34.948,
	37.372,44.409,38.538,
	36.4,47.877,39.726,
	38.575,50.94,39.183,
	38.352,54.301,41.008,
	39.193,57.914,40.025,
	43.441,54.546,38.613,
	44.399,54.749,34.94,
	42.678,52.933,32.075,
	45.315,52.923,29.35,
	48.165,54.801,27.684,
	47.449,56.609,24.409,
	50.028,57.597,21.745,
	49.25,59.431,18.495,
	50.705,61.828,15.905,
	47.421,63.842,16.335,
	47.007,66.401,19.178,
	43.646,65.085,20.381,
	42.22,61.564,20.658,
	38.519,60.776,21.109,
	37.698,57.784,23.3,
	34.489,55.86,23.707,
	34.599,53.589,26.755,
	32.004,50.853,27.395,
	31.632,50.33,31.093,
	29.046,52.113,36.687,
	28.324,50.7,40.149,
	
	22.80633333333334,55.421277777777775,33.49883333333333,
	25.6659,48.2489,30.7947,
	26.08561111111111,56.22138888888889,30.838166666666666,
	28.77475,53.75575,24.722,
	31.06423076923077,57.66130769230768,29.790461538461535,
	30.72325,60.261375,24.574125,
	37.0765,60.29928571428571,28.291,
	37.23733333333333,64.65488888888889,22.74711111111111,
	42.6422,61.787299999999995,26.3351,
	44.8276,67.8026,25.1816,
	47.8711,62.252,22.6918,
	52.89109090909091,67.23372727272726,25.061272727272726,
	54.9076,65.0392,18.6488,
	55.341153846153844,63.39561538461539,25.938307692307696,
	52.792,57.08725,26.69075,
	46.69535714285714,62.053285714285714,28.4855,
	50.7311875,56.52250000000001,32.827749999999995,
	42.7087,57.7909,29.020099999999996,
	42.739000000000004,60.569624999999995,34.057125,
	39.1879,54.749,36.1943,
	38.793600000000005,61.1872,32.027,
	35.14276923076923,56.41107692307692,32.50646153846154,
	33.93485714285713,57.8955,38.54314285714286,
	31.975199999999994,64.6136,34.2812,
	27.578249999999997,67.168,36.5645,
	30.623250000000002,67.297875,31.38375,
	30.84307142857143,61.887,30.503928571428577,
	21.688944444444445,62.46672222222222,32.0735,
	28.725125000000002,58.675374999999995,34.795249999999996,
	28.126333333333335,64.07233333333335,39.30433333333334,
	25.3416,59.58,41.5034,
	27.21492857142857,55.371071428571426,38.938,
	32.3185,56.633624999999995,44.747625000000006,
	33.443,51.639599999999994,42.352999999999994,
	33.8603,52.927800000000005,35.7284,
	33.609375,46.266875,35.914249999999996,
	37.07430000000001,50.3571,31.6637,
	31.556909090909095,46.493,29.586363636363636,
	34.9108,47.3846,25.038400000000003,
	39.69029999999999,51.677800000000005,26.283599999999996,
	34.365111111111105,50.61458333333334,20.37361111111111,
	41.55475,55.435,21.08125,
	36.5236111111111,55.967166666666664,17.103444444444445,
	43.747749999999996,60.087125,15.054625,
	38.324999999999996,64.98072727272726,18.520545454545456,
	42.66092307692307,68.592,16.64876923076923,
	43.72212499999999,67.653875,10.195625,
	49.84718181818182,64.86363636363636,10.87140909090909,
	52.95550000000001,68.95600000000002,6.1418,
	54.89475,65.56687500000001,4.34,
	53.01955555555555,62.27777777777778,9.553333333333335,
	48.41473333333334,57.95753333333334,4.6628,
	45.148399999999995,60.238,11.425999999999998,
	50.935142857142864,56.950357142857136,15.100571428571431,
	44.544200000000004,55.95029999999999,18.0283,
	52.28133333333332,53.74738888888889,18.584,
	43.81099999999999,52.476000000000006,22.78446153846153,
	51.796499999999995,50.55175,27.783125000000002,
	45.968375,46.968125,27.276125,
	48.25861538461538,51.91692307692308,31.98469230769231,
	44.502571428571436,45.329214285714286,32.77085714285714,
	43.174875,49.090562500000004,40.955625,
	45.815625000000004,42.600625,39.44025,
	50.9985,48.63849999999999,33.549,
	48.730599999999995,44.9422,28.784499999999998,
	54.76525,45.274,27.719875,
	50.661375,46.92541666666667,22.881708333333336,
	45.67728571428572,45.657357142857144,21.693285714285715,
	49.760444444444445,51.318777777777775,15.564,
	50.72894444444445,52.44822222222222,10.785777777777776,
	44.045750000000005,57.5425,8.58025,
	44.065,53.0952,4.6232,
	41.215625,59.17250000000001,2.442125,
	46.46992307692308,62.992461538461534,3.537846153846154,
	41.2725,64.1875,3.3477499999999996,
	39.720875,58.65387500000001,6.6236875,
	37.39177777777778,61.11877777777777,13.834666666666667,
	44.391999999999996,56.50825,13.026250000000001,
	38.992,53.715599999999995,14.497200000000001,
	43.674600000000005,50.4789,17.9402,
	42.361066666666666,48.022333333333336,25.741600000000002,
	36.25761111111112,40.91061111111111,25.328222222222223,
	39.36069230769231,45.50146153846154,30.31338461538462,
	40.58975,39.650124999999996,29.650875,
	34.58775,37.31175,32.71025,
	41.060625,36.813,33.492000000000004,
	42.95223076923077,41.36899999999999,33.45830769230769,
	34.53638888888889,42.61022222222223,31.19738888888888,
	38.902727272727276,42.446,39.04636363636363,
	34.387750000000004,48.15825,41.447625,
	39.501,50.68825,37.28225,
	38.8557,53.795899999999996,43.058600000000006,
	41.840714285714284,57.97007142857143,41.190357142857145,
	42.4175,52.815333333333335,39.342666666666666,
	46.747625,55.7525,35.170875,
	40.7696,53.4255,31.164599999999997,
	43.9492,52.9674,27.8336,
	50.7011111111111,54.51266666666666,28.574333333333332,
	45.57190000000001,57.634100000000004,24.0422,
	53.86627777777778,56.299611111111126,23.05561111111111,
	47.4052,59.9458,18.2544,
	50.82525,61.017625,13.33525,
	45.9546,62.778800000000004,15.316999999999998,
	48.981,69.01638888888891,20.28944444444445,
	41.851727272727274,67.54472727272729,20.921363636363633,
	43.50010000000001,59.82470000000001,20.9281,
	37.324,61.1815,19.825499999999998,
	39.98846153846154,57.49099999999999,24.964076923076924,
	32.8966,55.8155,22.2856,
	36.51776923076923,54.18576923076924,28.433230769230768,
	31.531799999999997,49.772,26.0166,
	30.197142857142858,49.28547619047619,33.646857142857144,
	29.726214285714285,54.92478571428571,35.02578571428572,
	
	//we copy these as placeholders
	24.255,51.648,34.746,
	25.813,50.2,31.559,
	27.177,53.007,29.374,
	29.297,54.098,26.392,
	31.1,57.261,27.539,
	32.589,59.637,24.941,
	35.413,62.044,25.933,
	38.564,63.562,24.436,
	42.152,63.807,25.676,
	45.018,66.082,24.556,
	48.165,64.255,23.445,
	51.678,65.551,22.735,
	53.953,64.179,20.001,
	56.146,61.243,21.109,
	54.744,61.19,24.628,
	52.328,58.64,26.037,
	49.291,60.022,27.858,
	47.849,57.98,30.77,
	44.019,58.222,30.664,
	42.586,58.559,34.201,
	39.487,56.63,35.23,
	38.395,59.862,37.025,
	37.428,61.236,33.601,
	34.392,58.895,33.565,
	32.766,60.445,36.678,
	31.162,63.73,35.743,
	27.854,65.596,35.784,
	28.424,65.938,31.975,
	27.677,62.184,31.67,
	25.149,61.981,34.577,
	27.738,59.837,36.446,
	29.025,62.12,39.233,
	27.149,60.023,41.852,
	29.31,56.919,41.16,
	32.739,56.277,42.721,
	33.616,53.011,40.919,
	33.341,51.622,37.421,
	34.057,48.322,35.669,
	35.579,48.938,32.227,
	34.644,46.431,29.506,
	36.17,47.871,26.322,
	38.036,50.91,25.057,
	37.892,52.37,21.535,
	39.915,55.383,20.362,
	39.882,57.643,17.306,
	42.214,60.466,16.283,
	40.255,63.734,16.733,
	42.328,66.381,14.902,
	44.242,66.219,11.586,
	47.755,64.674,11.507,
	51.624,67.491,7.059,
	52.517,64.5,4.797,
	51.396,61.91,7.371,
	48.493,59.544,7.893,
	46.915,59.531,11.354,
	47.78,56.772,13.831,
	46.64,55.911,17.363,
	48.084,53.303,19.768,
	46.568,51.943,22.977,
	48.433,50.204,25.793,
	46.159,48.589,28.449,
	46.956,49.412,32.101,
	45.828,47.324,35.113,
	46.301,47.714,38.885,
	47.492,44.064,39.129,
	50.084,44.52,36.327,
	50.331,46.642,33.193,
	50.283,45.116,29.73,
	52.908,45.832,27.067,
	50.587,45.34,24.055,
	47.247,47.931,19.709,
	47.493,50.297,16.76,
	45.284,51.667,14.012,
	46.447,53.846,11.098,
	44.362,55.772,8.557,
	44.569,54.855,4.848,
	43.348,58.296,3.642,
	45.1,61.389,5.092,
	41.728,63.096,5.645,
	40.334,60.229,7.739,
	40.515,59.258,11.407,
	42.71,56.4,12.589,
	41.001,54.046,15.114,
	41.631,50.986,17.289,
	40.21,49.374,20.416,
	40.686,46.549,22.867,
	38.442,44.382,24.974,
	39.128,43.557,28.637,
	38.564,39.853,29.452,
	36.164,38.834,32.277,
	39.016,37.838,34.601,
	40.377,41.396,34.486,
	37.028,43.191,34.948,
	37.372,44.409,38.538,
	36.4,47.877,39.726,
	38.575,50.94,39.183,
	38.352,54.301,41.008,
	39.193,57.914,40.025,
	43.441,54.546,38.613,
	44.399,54.749,34.94,
	42.678,52.933,32.075,
	45.315,52.923,29.35,
	48.165,54.801,27.684,
	47.449,56.609,24.409,
	50.028,57.597,21.745,
	49.25,59.431,18.495,
	50.705,61.828,15.905,
	47.421,63.842,16.335,
	47.007,66.401,19.178,
	43.646,65.085,20.381,
	42.22,61.564,20.658,
	38.519,60.776,21.109,
	37.698,57.784,23.3,
	34.489,55.86,23.707,
	34.599,53.589,26.755,
	32.004,50.853,27.395,
	31.632,50.33,31.093,
	29.046,52.113,36.687,
	28.324,50.7,40.149,
	
	22.80633333333334,55.421277777777775,33.49883333333333,
	25.6659,48.2489,30.7947,
	26.08561111111111,56.22138888888889,30.838166666666666,
	28.77475,53.75575,24.722,
	31.06423076923077,57.66130769230768,29.790461538461535,
	30.72325,60.261375,24.574125,
	37.0765,60.29928571428571,28.291,
	37.23733333333333,64.65488888888889,22.74711111111111,
	42.6422,61.787299999999995,26.3351,
	44.8276,67.8026,25.1816,
	47.8711,62.252,22.6918,
	52.89109090909091,67.23372727272726,25.061272727272726,
	54.9076,65.0392,18.6488,
	55.341153846153844,63.39561538461539,25.938307692307696,
	52.792,57.08725,26.69075,
	46.69535714285714,62.053285714285714,28.4855,
	50.7311875,56.52250000000001,32.827749999999995,
	42.7087,57.7909,29.020099999999996,
	42.739000000000004,60.569624999999995,34.057125,
	39.1879,54.749,36.1943,
	38.793600000000005,61.1872,32.027,
	35.14276923076923,56.41107692307692,32.50646153846154,
	33.93485714285713,57.8955,38.54314285714286,
	31.975199999999994,64.6136,34.2812,
	27.578249999999997,67.168,36.5645,
	30.623250000000002,67.297875,31.38375,
	30.84307142857143,61.887,30.503928571428577,
	21.688944444444445,62.46672222222222,32.0735,
	28.725125000000002,58.675374999999995,34.795249999999996,
	28.126333333333335,64.07233333333335,39.30433333333334,
	25.3416,59.58,41.5034,
	27.21492857142857,55.371071428571426,38.938,
	32.3185,56.633624999999995,44.747625000000006,
	33.443,51.639599999999994,42.352999999999994,
	33.8603,52.927800000000005,35.7284,
	33.609375,46.266875,35.914249999999996,
	37.07430000000001,50.3571,31.6637,
	31.556909090909095,46.493,29.586363636363636,
	34.9108,47.3846,25.038400000000003,
	39.69029999999999,51.677800000000005,26.283599999999996,
	34.365111111111105,50.61458333333334,20.37361111111111,
	41.55475,55.435,21.08125,
	36.5236111111111,55.967166666666664,17.103444444444445,
	43.747749999999996,60.087125,15.054625,
	38.324999999999996,64.98072727272726,18.520545454545456,
	42.66092307692307,68.592,16.64876923076923,
	43.72212499999999,67.653875,10.195625,
	49.84718181818182,64.86363636363636,10.87140909090909,
	52.95550000000001,68.95600000000002,6.1418,
	54.89475,65.56687500000001,4.34,
	53.01955555555555,62.27777777777778,9.553333333333335,
	48.41473333333334,57.95753333333334,4.6628,
	45.148399999999995,60.238,11.425999999999998,
	50.935142857142864,56.950357142857136,15.100571428571431,
	44.544200000000004,55.95029999999999,18.0283,
	52.28133333333332,53.74738888888889,18.584,
	43.81099999999999,52.476000000000006,22.78446153846153,
	51.796499999999995,50.55175,27.783125000000002,
	45.968375,46.968125,27.276125,
	48.25861538461538,51.91692307692308,31.98469230769231,
	44.502571428571436,45.329214285714286,32.77085714285714,
	43.174875,49.090562500000004,40.955625,
	45.815625000000004,42.600625,39.44025,
	50.9985,48.63849999999999,33.549,
	48.730599999999995,44.9422,28.784499999999998,
	54.76525,45.274,27.719875,
	50.661375,46.92541666666667,22.881708333333336,
	45.67728571428572,45.657357142857144,21.693285714285715,
	49.760444444444445,51.318777777777775,15.564,
	50.72894444444445,52.44822222222222,10.785777777777776,
	44.045750000000005,57.5425,8.58025,
	44.065,53.0952,4.6232,
	41.215625,59.17250000000001,2.442125,
	46.46992307692308,62.992461538461534,3.537846153846154,
	41.2725,64.1875,3.3477499999999996,
	39.720875,58.65387500000001,6.6236875,
	37.39177777777778,61.11877777777777,13.834666666666667,
	44.391999999999996,56.50825,13.026250000000001,
	38.992,53.715599999999995,14.497200000000001,
	43.674600000000005,50.4789,17.9402,
	42.361066666666666,48.022333333333336,25.741600000000002,
	36.25761111111112,40.91061111111111,25.328222222222223,
	39.36069230769231,45.50146153846154,30.31338461538462,
	40.58975,39.650124999999996,29.650875,
	34.58775,37.31175,32.71025,
	41.060625,36.813,33.492000000000004,
	42.95223076923077,41.36899999999999,33.45830769230769,
	34.53638888888889,42.61022222222223,31.19738888888888,
	38.902727272727276,42.446,39.04636363636363,
	34.387750000000004,48.15825,41.447625,
	39.501,50.68825,37.28225,
	38.8557,53.795899999999996,43.058600000000006,
	41.840714285714284,57.97007142857143,41.190357142857145,
	42.4175,52.815333333333335,39.342666666666666,
	46.747625,55.7525,35.170875,
	40.7696,53.4255,31.164599999999997,
	43.9492,52.9674,27.8336,
	50.7011111111111,54.51266666666666,28.574333333333332,
	45.57190000000001,57.634100000000004,24.0422,
	53.86627777777778,56.299611111111126,23.05561111111111,
	47.4052,59.9458,18.2544,
	50.82525,61.017625,13.33525,
	45.9546,62.778800000000004,15.316999999999998,
	48.981,69.01638888888891,20.28944444444445,
	41.851727272727274,67.54472727272729,20.921363636363633,
	43.50010000000001,59.82470000000001,20.9281,
	37.324,61.1815,19.825499999999998,
	39.98846153846154,57.49099999999999,24.964076923076924,
	32.8966,55.8155,22.2856,
	36.51776923076923,54.18576923076924,28.433230769230768,
	31.531799999999997,49.772,26.0166,
	30.197142857142858,49.28547619047619,33.646857142857144,
	29.726214285714285,54.92478571428571,35.02578571428572,
	
	24.255,51.648,34.746,
	25.813,50.2,31.559,
	27.177,53.007,29.374,
	29.297,54.098,26.392,
	31.1,57.261,27.539,
	32.589,59.637,24.941,
	35.413,62.044,25.933,
	38.564,63.562,24.436,
	42.152,63.807,25.676,
	45.018,66.082,24.556,
	48.165,64.255,23.445,
	51.678,65.551,22.735,
	53.953,64.179,20.001,
	56.146,61.243,21.109,
	54.744,61.19,24.628,
	52.328,58.64,26.037,
	49.291,60.022,27.858,
	47.849,57.98,30.77,
	44.019,58.222,30.664,
	42.586,58.559,34.201,
	39.487,56.63,35.23,
	38.395,59.862,37.025,
	37.428,61.236,33.601,
	34.392,58.895,33.565,
	32.766,60.445,36.678,
	31.162,63.73,35.743,
	27.854,65.596,35.784,
	28.424,65.938,31.975,
	27.677,62.184,31.67,
	25.149,61.981,34.577,
	27.738,59.837,36.446,
	29.025,62.12,39.233,
	27.149,60.023,41.852,
	29.31,56.919,41.16,
	32.739,56.277,42.721,
	33.616,53.011,40.919,
	33.341,51.622,37.421,
	34.057,48.322,35.669,
	35.579,48.938,32.227,
	34.644,46.431,29.506,
	36.17,47.871,26.322,
	38.036,50.91,25.057,
	37.892,52.37,21.535,
	39.915,55.383,20.362,
	39.882,57.643,17.306,
	42.214,60.466,16.283,
	40.255,63.734,16.733,
	42.328,66.381,14.902,
	44.242,66.219,11.586,
	47.755,64.674,11.507,
	51.624,67.491,7.059,
	52.517,64.5,4.797,
	51.396,61.91,7.371,
	48.493,59.544,7.893,
	46.915,59.531,11.354,
	47.78,56.772,13.831,
	46.64,55.911,17.363,
	48.084,53.303,19.768,
	46.568,51.943,22.977,
	48.433,50.204,25.793,
	46.159,48.589,28.449,
	46.956,49.412,32.101,
	45.828,47.324,35.113,
	46.301,47.714,38.885,
	47.492,44.064,39.129,
	50.084,44.52,36.327,
	50.331,46.642,33.193,
	50.283,45.116,29.73,
	52.908,45.832,27.067,
	50.587,45.34,24.055,
	47.247,47.931,19.709,
	47.493,50.297,16.76,
	45.284,51.667,14.012,
	46.447,53.846,11.098,
	44.362,55.772,8.557,
	44.569,54.855,4.848,
	43.348,58.296,3.642,
	45.1,61.389,5.092,
	41.728,63.096,5.645,
	40.334,60.229,7.739,
	40.515,59.258,11.407,
	42.71,56.4,12.589,
	41.001,54.046,15.114,
	41.631,50.986,17.289,
	40.21,49.374,20.416,
	40.686,46.549,22.867,
	38.442,44.382,24.974,
	39.128,43.557,28.637,
	38.564,39.853,29.452,
	36.164,38.834,32.277,
	39.016,37.838,34.601,
	40.377,41.396,34.486,
	37.028,43.191,34.948,
	37.372,44.409,38.538,
	36.4,47.877,39.726,
	38.575,50.94,39.183,
	38.352,54.301,41.008,
	39.193,57.914,40.025,
	43.441,54.546,38.613,
	44.399,54.749,34.94,
	42.678,52.933,32.075,
	45.315,52.923,29.35,
	48.165,54.801,27.684,
	47.449,56.609,24.409,
	50.028,57.597,21.745,
	49.25,59.431,18.495,
	50.705,61.828,15.905,
	47.421,63.842,16.335,
	47.007,66.401,19.178,
	43.646,65.085,20.381,
	42.22,61.564,20.658,
	38.519,60.776,21.109,
	37.698,57.784,23.3,
	34.489,55.86,23.707,
	34.599,53.589,26.755,
	32.004,50.853,27.395,
	31.632,50.33,31.093,
	29.046,52.113,36.687,
	28.324,50.7,40.149,
	
	22.80633333333334,55.421277777777775,33.49883333333333,
	25.6659,48.2489,30.7947,
	26.08561111111111,56.22138888888889,30.838166666666666,
	28.77475,53.75575,24.722,
	31.06423076923077,57.66130769230768,29.790461538461535,
	30.72325,60.261375,24.574125,
	37.0765,60.29928571428571,28.291,
	37.23733333333333,64.65488888888889,22.74711111111111,
	42.6422,61.787299999999995,26.3351,
	44.8276,67.8026,25.1816,
	47.8711,62.252,22.6918,
	52.89109090909091,67.23372727272726,25.061272727272726,
	54.9076,65.0392,18.6488,
	55.341153846153844,63.39561538461539,25.938307692307696,
	52.792,57.08725,26.69075,
	46.69535714285714,62.053285714285714,28.4855,
	50.7311875,56.52250000000001,32.827749999999995,
	42.7087,57.7909,29.020099999999996,
	42.739000000000004,60.569624999999995,34.057125,
	39.1879,54.749,36.1943,
	38.793600000000005,61.1872,32.027,
	35.14276923076923,56.41107692307692,32.50646153846154,
	33.93485714285713,57.8955,38.54314285714286,
	31.975199999999994,64.6136,34.2812,
	27.578249999999997,67.168,36.5645,
	30.623250000000002,67.297875,31.38375,
	30.84307142857143,61.887,30.503928571428577,
	21.688944444444445,62.46672222222222,32.0735,
	28.725125000000002,58.675374999999995,34.795249999999996,
	28.126333333333335,64.07233333333335,39.30433333333334,
	25.3416,59.58,41.5034,
	27.21492857142857,55.371071428571426,38.938,
	32.3185,56.633624999999995,44.747625000000006,
	33.443,51.639599999999994,42.352999999999994,
	33.8603,52.927800000000005,35.7284,
	33.609375,46.266875,35.914249999999996,
	37.07430000000001,50.3571,31.6637,
	31.556909090909095,46.493,29.586363636363636,
	34.9108,47.3846,25.038400000000003,
	39.69029999999999,51.677800000000005,26.283599999999996,
	34.365111111111105,50.61458333333334,20.37361111111111,
	41.55475,55.435,21.08125,
	36.5236111111111,55.967166666666664,17.103444444444445,
	43.747749999999996,60.087125,15.054625,
	38.324999999999996,64.98072727272726,18.520545454545456,
	42.66092307692307,68.592,16.64876923076923,
	43.72212499999999,67.653875,10.195625,
	49.84718181818182,64.86363636363636,10.87140909090909,
	52.95550000000001,68.95600000000002,6.1418,
	54.89475,65.56687500000001,4.34,
	53.01955555555555,62.27777777777778,9.553333333333335,
	48.41473333333334,57.95753333333334,4.6628,
	45.148399999999995,60.238,11.425999999999998,
	50.935142857142864,56.950357142857136,15.100571428571431,
	44.544200000000004,55.95029999999999,18.0283,
	52.28133333333332,53.74738888888889,18.584,
	43.81099999999999,52.476000000000006,22.78446153846153,
	51.796499999999995,50.55175,27.783125000000002,
	45.968375,46.968125,27.276125,
	48.25861538461538,51.91692307692308,31.98469230769231,
	44.502571428571436,45.329214285714286,32.77085714285714,
	43.174875,49.090562500000004,40.955625,
	45.815625000000004,42.600625,39.44025,
	50.9985,48.63849999999999,33.549,
	48.730599999999995,44.9422,28.784499999999998,
	54.76525,45.274,27.719875,
	50.661375,46.92541666666667,22.881708333333336,
	45.67728571428572,45.657357142857144,21.693285714285715,
	49.760444444444445,51.318777777777775,15.564,
	50.72894444444445,52.44822222222222,10.785777777777776,
	44.045750000000005,57.5425,8.58025,
	44.065,53.0952,4.6232,
	41.215625,59.17250000000001,2.442125,
	46.46992307692308,62.992461538461534,3.537846153846154,
	41.2725,64.1875,3.3477499999999996,
	39.720875,58.65387500000001,6.6236875,
	37.39177777777778,61.11877777777777,13.834666666666667,
	44.391999999999996,56.50825,13.026250000000001,
	38.992,53.715599999999995,14.497200000000001,
	43.674600000000005,50.4789,17.9402,
	42.361066666666666,48.022333333333336,25.741600000000002,
	36.25761111111112,40.91061111111111,25.328222222222223,
	39.36069230769231,45.50146153846154,30.31338461538462,
	40.58975,39.650124999999996,29.650875,
	34.58775,37.31175,32.71025,
	41.060625,36.813,33.492000000000004,
	42.95223076923077,41.36899999999999,33.45830769230769,
	34.53638888888889,42.61022222222223,31.19738888888888,
	38.902727272727276,42.446,39.04636363636363,
	34.387750000000004,48.15825,41.447625,
	39.501,50.68825,37.28225,
	38.8557,53.795899999999996,43.058600000000006,
	41.840714285714284,57.97007142857143,41.190357142857145,
	42.4175,52.815333333333335,39.342666666666666,
	46.747625,55.7525,35.170875,
	40.7696,53.4255,31.164599999999997,
	43.9492,52.9674,27.8336,
	50.7011111111111,54.51266666666666,28.574333333333332,
	45.57190000000001,57.634100000000004,24.0422,
	53.86627777777778,56.299611111111126,23.05561111111111,
	47.4052,59.9458,18.2544,
	50.82525,61.017625,13.33525,
	45.9546,62.778800000000004,15.316999999999998,
	48.981,69.01638888888891,20.28944444444445,
	41.851727272727274,67.54472727272729,20.921363636363633,
	43.50010000000001,59.82470000000001,20.9281,
	37.324,61.1815,19.825499999999998,
	39.98846153846154,57.49099999999999,24.964076923076924,
	32.8966,55.8155,22.2856,
	36.51776923076923,54.18576923076924,28.433230769230768,
	31.531799999999997,49.772,26.0166,
	30.197142857142858,49.28547619047619,33.646857142857144,
	29.726214285714285,54.92478571428571,35.02578571428572,
]);