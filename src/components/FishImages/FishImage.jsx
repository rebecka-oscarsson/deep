const FishImage = ({ fill, darkColor, id }) => {
  return (
    <svg stroke={fill} strokeWidth="1" viewBox="0 0 413 570">
      <radialGradient id={id} fx="40%" fy="25%">
        <stop stopColor={fill} offset="0%" stopOpacity="0.4" />
        <stop stopColor={fill} offset="50%" stopOpacity="0.5" />
        <stop stopColor={fill} offset="100%" startOpacity="0.7" stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id={`a${id}`} x2="50%" y2="40%" spreadMethod="reflect">
        <stop stopColor="transparent" offset="0%" />
        <stop stopColor={darkColor} offset="100%" />
      </linearGradient>
      <g
        id="imagebot_2"
        //style={{display:'block'}}
      >
        <g
          transform="translate(-182.749,-209.46)"
          fillRule="evenodd"
          id="tentacles"
          //style={{display:'inline'}}
          fill={`url(#a${id})`}
        >
          <path
            d="m 221.21,416.86 -3.7499,9.2703 c 24.462,9.5451 45.248,29.003 56.42,53.039 11.193,24.026 12.792,52.685 4.187,78.017 -6.0326,17.921 -16.998,34.093 -27.617,50.446 -10.668,16.329 -21.231,33.44 -26.177,52.654 -3.4156,13.372 -3.7919,27.428 -1.3677,40.928 v 10e-6 c 2.4214,13.501 7.651,26.486 15.426,37.722 7.7775,11.235 18.049,20.647 29.722,27.604 11.673,6.9584 24.784,11.483 38.229,12.964 -13.408,-1.7825 -26.346,-6.5912 -37.753,-13.742 -11.406,-7.152 -21.317,-16.669 -28.686,-27.848 -7.3712,-11.177 -12.177,-23.978 -14.238,-37.154 -2.0586,-13.177 -1.3788,-26.771 2.1942,-39.531 5.1122,-18.399 15.842,-34.783 26.78,-50.842 10.988,-16.036 22.503,-32.313 29.408,-51.115 0,-10e-6 1e-5,-2e-5 1e-5,-2e-5 9.7284,-26.707 8.8085,-57.184 -2.6891,-83.45 -11.519,-26.256 -33.403,-47.818 -60.089,-58.962 z"
            id="imagebot_21"
          />
          <path
            d="m 266.99,437.88 -4.4182,8.971 c 17.077,8.1089 31.557,22.042 40.355,38.973 8.809,16.926 11.979,36.938 8.7539,55.923 -3.242,19.574 -13.196,37.803 -22.686,56.115 -9.5728,18.285 -18.942,37.654 -20.729,58.617 v 2e-5 c -1.919,23.234 6.359,46.96 22.067,63.829 15.713,16.864 38.611,26.611 61.397,26.343 -22.785,-0.33029 -45.155,-10.669 -60.066,-27.55 -14.916,-16.877 -22.249,-40.151 -19.82,-62.278 v -1e-5 c 2.1423,-20.031 11.83,-38.498 21.748,-56.49 10.001,-17.965 20.621,-36.418 24.819,-57.349 4.0083,-20.394 1.2123,-42.094 -7.9595,-60.941 -9.1828,-18.841 -24.62,-34.582 -43.46,-44.163 z"
            id="imagebot_20"
          />
          <path
            d="m 314.52,436.54 -8.0468,5.937 c 15.173,19.938 25.796,43.439 31.247,68.116 5.4424,24.678 5.7322,50.616 0.29507,75.415 v 10e-6 c -3.0342,13.887 -7.8158,27.545 -11.562,41.609 -3.7691,14.063 -6.4441,28.766 -5.1365,43.442 v 1e-5 c 1.7488,19.286 10.696,37.706 24.585,50.912 13.891,13.203 32.594,21.071 51.543,21.823 -18.921,-1.2851 -37.195,-9.6604 -50.424,-22.968 -13.231,-13.305 -21.363,-31.483 -22.511,-50.012 -0.89871,-14.12 2.1461,-28.262 6.1998,-41.999 4.0769,-13.737 9.2494,-27.288 12.798,-41.521 l 1e-5,-1e-5 c 6.3317,-25.475 6.8326,-52.38 1.8728,-78.277 -4.9515,-25.898 -15.378,-50.867 -30.86,-72.478 z"
            id="imagebot_19"
          />
          <path
            d="m 367.76,436.92 -5.961,8.0291 c 13.993,10.08 25.308,24.066 32.269,39.991 6.9663,15.922 9.6049,33.848 7.4745,51.231 -2.4062,20.223 -11.282,39.515 -19.573,58.958 -10e-6,0 -10e-6,10e-6 -10e-6,2e-5 -8.3695,19.422 -16.316,39.946 -16.604,61.476 -0.2543,23.165 9.0248,46.129 25.062,62.496 16.042,16.362 38.638,25.921 61.299,26.12 -22.648,-0.80945 -44.727,-10.961 -59.975,-27.384 -15.253,-16.419 -23.578,-39 -22.727,-61.143 0.7402,-20.633 9.0951,-40.266 17.847,-59.388 0,-10e-6 1e-5,-10e-6 1e-5,-2e-5 8.8311,-19.103 18.37,-38.613 21.673,-60.178 2.7841,-18.593 0.50241,-37.949 -6.6108,-55.496 -7.1185,-17.545 -19.014,-33.147 -34.174,-44.711 z"
            id="imagebot_18"
          />
          <path
            d="m 421.58,430.61 -3.8714,9.2202 c 13.928,5.6144 25.917,16.474 32.91,29.933 7.0094,13.451 9.0875,29.636 5.6276,44.558 -3.1842,14.106 -11.287,27.022 -19.986,39.45 -8.759,12.399 -18.398,24.704 -25.121,38.876 -7.5631,16.021 -10.91,33.921 -9.6807,51.481 1.2311,17.559 7.0326,34.705 16.631,49.325 9.5998,14.619 22.965,26.662 38.387,34.666 15.422,8.0031 32.863,11.946 50.115,11.387 -17.261,0.12355 -34.483,-4.2589 -49.499,-12.539 -15.016,-8.2799 -27.814,-20.45 -36.801,-34.921 -8.988,-14.47 -14.165,-31.24 -14.92,-48.143 -0.75708,-16.904 2.9066,-33.955 10.466,-48.966 6.675,-13.321 16.419,-25.048 25.594,-37.422 0,0 0,-1e-5 10e-6,-1e-5 9.2341,-12.345 18.033,-25.801 22.139,-41.395 4.2835,-16.624 2.4768,-34.735 -5.1171,-50.299 -7.6103,-15.556 -20.851,-28.249 -36.873,-35.21 z"
            id="imagebot_17"
          />
          <path
            d="m 299.74,433.72 -8.7708,-4.8034 c -21.929,41.389 -32.143,88.648 -29.377,135.04 v 10e-6 c 1.4473,24.052 6.2269,47.502 9.5518,70.989 3.3022,23.486 5.195,47.401 0.8543,70.616 -4.606,24.716 -16.358,48.187 -33.566,66.797 17.723,-18.12 30.271,-41.399 35.657,-66.376 5.0432,-23.456 3.8582,-47.818 1.1572,-71.558 v -2e-5 c -2.6784,-23.739 -6.7936,-47.244 -7.5225,-70.748 -1.4313,-45.31 9.8493,-90.831 32.017,-129.96 z"
            id="imagebot_16"
          />
          <path
            d="m 541.28,448.06 -6.1015,-7.9229 c -17.118,13.539 -30.719,31.174 -39.847,50.778 -9.1387,19.598 -13.84,41.245 -13.202,62.791 0.74133,23.245 7.1204,45.482 12.705,67.421 v 2e-5 c 5.5306,21.944 10.395,44.321 8.0555,66.549 -2.1213,20.445 -10.424,40.325 -23.609,56.305 -13.184,15.98 -31.23,28.032 -51.21,34.093 20.13,-5.5438 38.637,-17.169 52.444,-33.048 13.806,-15.88 22.852,-35.946 25.587,-56.974 2.9387,-22.845 -1.3572,-45.905 -6.4141,-68.09 -5.0032,-22.19 -10.763,-44.244 -10.811,-66.374 v -2e-5 c -0.0923,-20.435 4.9298,-40.807 14,-59.042 9.0814,-18.23 22.254,-34.407 38.402,-46.486 z"
            id="imagebot_15"
          />
          <path
            d="m 466.68,442.94 -7.2989,-6.8357 c -24.98,27.458 -39.292,63.978 -39.745,100.7 -0.24735,23.666 4.8892,46.585 8.5997,69.321 v 10e-6 c 3.6542,22.733 5.9568,46.096 0.13553,68.143 -3.9673,15.13 -11.946,29.227 -22.67,40.8 -10.725,11.571 -24.25,20.678 -39.265,25.867 15.161,-4.747 29.063,-13.494 40.274,-24.904 11.213,-11.409 19.794,-25.539 24.348,-41.015 v -10e-6 c 6.5876,-22.519 5.0445,-46.562 1.9461,-69.595 -3.0425,-23.032 -7.4934,-45.856 -6.5193,-68.437 1.4403,-34.964 16.157,-69.161 40.195,-94.043 z"
            id="imagebot_14"
          />
          <path
            d="m 317.54,435.93 -0.19438,9.9981 c 9.5186,0.0516 19.099,2.6228 27.626,7.168 8.519,4.5586 16.034,11.117 21.443,19.1 0,10e-6 10e-6,10e-6 10e-6,2e-5 5.4284,7.9704 8.7894,17.426 9.8982,27.137 v 10e-6 c 1.0959,9.7125 -0.0535,19.736 -3.5993,28.838 -3.7264,9.6968 -10.072,18.446 -17.103,26.658 -7.0534,8.2004 -14.926,15.931 -22.174,24.414 -7.2686,8.4725 -13.898,17.862 -17.936,28.535 -4.0601,10.694 -5.145,22.826 -1.4133,33.793 2.7338,7.8603 7.7622,14.64 13.7,20.17 5.9274,5.5298 12.693,9.9283 19.542,13.951 6.8826,4.0511 13.876,7.7915 20.465,12.106 6.5041,4.2658 12.657,9.1261 17.487,15.138 v 10e-6 c 8.2902,10.296 12.474,23.946 11.326,37.239 -1.1454,13.294 -7.6171,26.15 -17.733,35.04 10.319,-8.6539 17.181,-21.438 18.664,-34.949 1.4799,-13.511 -2.4369,-27.602 -10.786,-38.486 -4.8712,-6.3356 -11.077,-11.502 -17.611,-15.988 -6.6059,-4.543 -13.557,-8.4741 -20.277,-12.64 -6.6733,-4.1455 -13.157,-8.5623 -18.646,-13.952 0,-1e-5 0,-1e-5 -1e-5,-1e-5 -5.4774,-5.3891 -10.025,-11.781 -12.274,-18.911 -3.2005,-9.8912 -1.8426,-20.969 2.0562,-30.763 3.9232,-9.8211 10.446,-18.522 17.646,-26.604 7.2201,-8.0724 15.249,-15.597 22.732,-23.892 7.5055,-8.2832 14.452,-17.502 18.938,-28.2 4.211,-10.161 5.7878,-21.336 4.7955,-32.284 v -2e-5 c -0.97939,-10.949 -4.5314,-21.719 -10.557,-31.069 v -10e-6 c -6.0448,-9.3381 -14.434,-17.058 -24.109,-22.51 -9.6675,-5.4648 -20.661,-8.6841 -31.904,-9.0362 z"
            id="imagebot_13"
          />
          <path
            d="m 533.72,443.08 -0.19438,-9.9981 c -11.243,0.35209 -22.237,3.5714 -31.904,9.0362 -9.6749,5.4513 -18.064,13.172 -24.109,22.51 0,0 0,10e-6 -1e-5,2e-5 -6.0258,9.3507 -9.5778,20.12 -10.557,31.069 v 2e-5 c -0.99228,10.948 0.58456,22.123 4.7955,32.284 4.4861,10.698 11.433,19.917 18.938,28.2 7.4832,8.295 15.512,15.819 22.732,23.892 7.2,8.082 13.723,16.783 17.646,26.604 3.8987,9.7942 5.2567,20.872 2.0562,30.763 -2.2484,7.1301 -6.7963,13.522 -12.274,18.911 -5.4888,5.39 -11.973,9.8068 -18.646,13.952 -6.7196,4.1659 -13.671,8.097 -20.277,12.64 0,0 -10e-6,10e-6 -2e-5,10e-6 -6.5335,4.4863 -12.74,9.6528 -17.611,15.988 0,10e-6 0,10e-6 -1e-5,10e-6 -8.3488,10.883 -12.266,24.974 -10.786,38.486 1.4825,13.511 8.3446,26.295 18.664,34.949 -10.116,-8.8904 -16.588,-21.746 -17.733,-35.04 -1.148,-13.293 3.0355,-26.944 11.326,-37.239 4.8298,-6.0123 10.982,-10.873 17.487,-15.138 6.5883,-4.3142 13.582,-8.0546 20.465,-12.106 6.8488,-4.0231 13.614,-8.4216 19.542,-13.951 l 1e-5,-10e-6 c 5.9379,-5.5299 10.966,-12.309 13.7,-20.17 3.7318,-10.967 2.6468,-23.099 -1.4133,-33.793 -4.038,-10.673 -10.668,-20.062 -17.936,-28.535 -7.2488,-8.4825 -15.121,-16.213 -22.174,-24.414 -7.0309,-8.2118 -13.377,-16.961 -17.103,-26.658 -3.5457,-9.1016 -4.6952,-19.125 -3.5993,-28.838 1.1088,-9.7112 4.4697,-19.166 9.8982,-27.137 5.4094,-7.983 12.924,-14.542 21.443,-19.1 8.5264,-4.5452 18.107,-7.1164 27.626,-7.168 z"
            id="imagebot_12"
          />
        </g>
        <path
          transform="translate(-182.749,-209.46)"
          d="m 390.21,209.46 c -112.18,0 -203.13,95.976 -203.13,214.38 0,8.459 -4.3313,32.291 4.7128,40.791 26.525,24.931 67.081,-11.66 100.86,-11.839 33.017,-0.17518 65.64,10.742 98.656,10.524 33.051,-0.21838 65.606,-11.419 98.656,-11.839 32.618,-0.41432 71.65,32.831 97.552,9.2082 8.3276,-7.5946 5.7927,-28.387 5.7927,-36.845 0,-118.4 -90.93,-214.38 -203.11,-214.38 z"
          id="body"
          fill={`url(#${id})`}
          strokeWidth="10"
        />
      </g>
    </svg>
  );
};

export default FishImage;
