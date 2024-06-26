"use client";
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import logo from "../../../../public/logo1.svg";
import Image from "next/image";

export default function Login({ searchParams }) {
  const signIn = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      return redirect(`/login?message=Could not authenticate user`);
    }

    return redirect(`/`);
  };

  return (
    <div className="flex-1 flex flex-col px-8 justify-center w-full items-center gap-2">
      <div className="relative flex flex-col  w-[30rem] h-3/4 border-orange-600 border rounded-xl pt-10 items-center gap-10 ">
        <svg
          className="absolute top-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#EA580C"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute bottom-20"
          width="300"
          height="300"
          viewBox="0 0 154 154"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.8871 141.585C22.8517 141.585 22.8169 141.577 22.7846 141.563C22.7523 141.548 22.7232 141.527 22.6992 141.502C22.6748 141.476 22.6557 141.446 22.6431 141.413C22.6304 141.38 22.6245 141.345 22.6256 141.31C22.6264 141.275 22.6342 141.24 22.6485 141.208C22.6628 141.175 22.6833 141.146 22.7089 141.122C22.7344 141.098 22.7646 141.079 22.7975 141.066C22.8305 141.053 22.8656 141.047 22.9009 141.048C38.9919 141.47 57.3594 132.236 69.7009 117.524C79.5636 105.782 85.726 91.097 90.2928 68.4212C90.3113 68.3564 90.3535 68.3011 90.411 68.2661C90.4685 68.2311 90.5371 68.2191 90.6031 68.2325C90.6691 68.2458 90.7276 68.2836 90.767 68.3381C90.8064 68.3927 90.8238 68.4601 90.8157 68.527C86.2259 91.2994 80.0337 106.052 70.1096 117.866C58.5118 131.695 40.2026 142.039 22.8871 141.585Z"
            fill="#FFE55D"
          />
          <path
            d="M64.1283 117.388C78.2058 98.1909 81.9452 77.4327 83.8881 57.8599C83.8892 57.8232 83.8978 57.7872 83.9134 57.7539C83.9289 57.7207 83.9512 57.691 83.9787 57.6668C84.0063 57.6425 84.0385 57.6242 84.0734 57.6129C84.1084 57.6016 84.1452 57.5977 84.1818 57.6013C84.2183 57.6048 84.2537 57.6159 84.2858 57.6337C84.3178 57.6516 84.3459 57.6758 84.3682 57.705C84.3905 57.7341 84.4065 57.7676 84.4154 57.8032C84.4242 57.8388 84.4256 57.8759 84.4195 57.9121C82.4681 77.5608 78.7118 98.4033 64.5607 117.703C64.5401 117.732 64.5141 117.756 64.4841 117.774C64.4542 117.792 64.4209 117.805 64.3861 117.81C64.3514 117.816 64.316 117.814 64.2819 117.806C64.2477 117.797 64.2156 117.782 64.1873 117.761C64.1588 117.741 64.1346 117.715 64.1162 117.685C64.0977 117.655 64.0854 117.622 64.0799 117.587C64.0744 117.552 64.0759 117.517 64.0842 117.483C64.0925 117.449 64.1075 117.416 64.1283 117.388Z"
            fill="#FFE55D"
          />
          <path
            d="M66.5929 149.892C88.1889 146.96 108.088 136.596 122.87 120.58C137.651 104.565 146.39 83.8997 147.585 62.1384C147.586 62.1033 147.595 62.0689 147.61 62.0372C147.625 62.0055 147.647 61.9771 147.673 61.9536C147.699 61.9302 147.729 61.9121 147.763 61.9005C147.796 61.889 147.831 61.8841 147.866 61.8861C147.937 61.8903 148.003 61.9222 148.05 61.9749C148.097 62.0277 148.121 62.0969 148.117 62.1675C146.916 84.0526 138.127 104.835 123.261 120.942C108.396 137.048 88.383 147.472 66.6642 150.421C66.6036 150.428 66.5425 150.414 66.491 150.381C66.4395 150.348 66.4006 150.299 66.3808 150.242C66.361 150.184 66.3614 150.121 66.382 150.064C66.4025 150.006 66.4421 149.958 66.494 149.926C66.5244 149.908 66.558 149.897 66.5929 149.892Z"
            fill="#FFE55D"
          />
          <path
            d="M94.0589 14.1891C94.0205 14.1894 93.9825 14.1814 93.9475 14.1655C93.9125 14.1496 93.8815 14.1263 93.8565 14.0971C93.8313 14.0679 93.8128 14.0335 93.8023 13.9965C93.7917 13.9594 93.7892 13.9205 93.7951 13.8824C94.2222 10.9603 94.8134 7.77526 95.551 4.41536C95.5691 4.34919 95.6118 4.29245 95.6704 4.2568C95.729 4.22115 95.799 4.2093 95.8661 4.22368C95.9332 4.23863 95.992 4.27882 96.0302 4.33592C96.0685 4.39302 96.0833 4.46265 96.0716 4.53038C94.0528 13.7344 94.5895 14.1891 94.0589 14.1891Z"
            fill="#FFE55D"
          />
          <path
            d="M73.0294 20.8177C72.7043 20.8177 73.1268 20.7295 69.3306 16.6957C69.2822 16.6442 69.2563 16.5756 69.2584 16.505C69.2606 16.4344 69.2907 16.3676 69.3421 16.3192C69.3936 16.2708 69.4622 16.2448 69.5328 16.247C69.6034 16.2491 69.6702 16.2792 69.7186 16.3307C70.9748 17.6133 72.1526 18.9703 73.2457 20.3945C73.2745 20.4343 73.2917 20.4813 73.2955 20.5303C73.2993 20.5794 73.2895 20.6285 73.2671 20.6723C73.2447 20.716 73.2107 20.7528 73.1688 20.7785C73.1268 20.8041 73.0786 20.8177 73.0294 20.8177Z"
            fill="#FFE55D"
          />
          <path
            d="M101.526 18.4561C101.472 18.4558 101.42 18.4393 101.376 18.4088C101.331 18.3783 101.297 18.3353 101.278 18.2851C101.258 18.2349 101.255 18.1799 101.267 18.1275C101.279 18.075 101.308 18.0276 101.348 17.9915L104.624 15.0203C104.677 14.9767 104.744 14.9552 104.813 14.9602C104.881 14.9652 104.945 14.9963 104.991 15.0471C105.037 15.0979 105.062 15.1644 105.06 15.233C105.058 15.3015 105.03 15.3668 104.982 15.4152C101.464 18.6095 101.676 18.4561 101.526 18.4561Z"
            fill="#FFE55D"
          />
          <path
            d="M61.0663 26.4946C60.9897 26.2645 60.913 26.1112 60.8363 25.8812C60.7251 25.5476 60.6952 25.1735 60.5986 24.7885C60.6569 24.317 60.686 23.8416 60.6845 23.3662C60.6078 23.2896 60.5312 23.1362 60.3778 23.1362L59.5397 22.6762C59.3623 22.5289 59.1496 22.4303 58.9226 22.39C58.6956 22.3497 58.462 22.369 58.2447 22.4461C58.2223 22.4597 58.2003 22.474 58.1788 22.4891C57.412 22.1157 56.7158 21.7653 56.1085 22.3702C56.0319 22.6002 55.8785 22.7536 55.8018 22.9798C55.6485 23.2098 55.3418 23.2098 55.1884 23.4398C54.8817 23.8232 55.1884 24.4305 55.0351 24.8875C54.8817 25.3444 54.4984 25.497 54.8051 26.0299C55.1555 26.7307 55.9813 26.7967 56.4812 27.1731C56.9269 27.5207 57.4497 27.7558 58.0055 27.8586C58.6448 28.064 59.3234 28.1165 59.9868 28.012C60.3198 27.9324 60.6127 27.7348 60.8112 27.4558C61.0097 27.1768 61.1004 26.8353 61.0663 26.4946Z"
            fill="white"
          />
          <path
            d="M126.402 64.2101C126.387 63.8691 126.302 63.5347 126.154 63.2271C126.006 62.9196 125.797 62.6452 125.54 62.4205C125.282 62.1965 124.982 62.027 124.657 61.9222C124.332 61.8175 123.989 61.7796 123.649 61.811C117.762 61.2965 112.071 62.981 105.783 65.075C105.396 66.2322 104.685 67.2542 103.736 68.0201C101.3 69.9707 96.1447 72.2089 92.7817 72.3683C93.3571 73.1885 94.042 73.9261 94.8175 74.5605C96.765 75.9629 99.3834 75.4254 101.906 74.7522C106.813 73.3038 116.38 70.2697 118.705 69.3849C112.819 88.0215 112.917 87.5185 112.917 88.0591C112.949 88.1779 113.012 88.286 113.1 88.3722C113.187 88.4584 113.296 88.5194 113.416 88.549C113.921 88.7832 114.46 88.9384 115.012 89.0091C115.058 89.0098 115.104 88.9983 115.144 88.9758C115.185 88.9533 115.218 88.9207 115.242 88.881C117.209 85.6607 122.556 76.8431 124.242 73.4732C125.549 70.9246 126.978 67.5616 126.402 64.2101Z"
            fill="#4B1010"
          />
          <path
            d="M92.382 31.6755C89.897 28.8669 86.9243 27.7244 83.8481 29.9227C83.0091 30.7257 82.3509 31.6984 81.9174 32.7758C81.4839 33.8532 81.285 35.0106 81.3339 36.1709C81.4788 38.3569 82.8843 40.75 84.9906 41.3519C85.5406 41.3759 86.0886 41.2709 86.5908 41.0452C87.1275 40.8918 87.4296 41.2752 87.8099 41.4285C88.1902 41.5819 88.9531 41.5819 88.8005 42.114C88.7952 42.41 88.8749 42.7006 89.0306 42.9521C89.1931 43.2151 89.4009 43.4466 89.644 43.6375L91.2235 44.6796C91.7848 43.9371 92.1106 43.0435 92.1589 42.114C92.1293 41.9399 92.1348 41.7616 92.175 41.5896C92.813 41.3054 93.3806 40.8843 93.8375 40.3561C94.2945 39.8279 94.6295 39.2056 94.8187 38.5333C95.5088 36.0184 93.9815 33.5042 92.382 31.6755Z"
            fill="white"
          />
          <path
            d="M87.9345 37.8685C87.5718 37.868 87.2172 37.9751 86.9154 38.1764C86.6137 38.3776 86.3785 38.6639 86.2397 38.9989C86.1008 39.334 86.0645 39.7027 86.1354 40.0584C86.2063 40.414 86.3812 40.7407 86.6379 40.9969C86.851 41.2099 87.1133 41.3672 87.4017 41.4546C87.69 41.5421 87.9955 41.5572 88.291 41.4984C88.5866 41.4396 88.8631 41.3089 89.096 41.1178C89.329 40.9267 89.5112 40.681 89.6266 40.4027C89.742 40.1243 89.7869 39.8218 89.7575 39.5219C89.728 39.222 89.6251 38.934 89.4577 38.6834C89.2904 38.4328 89.0639 38.2274 88.7982 38.0852C88.5325 37.9431 88.2358 37.8686 87.9345 37.8685Z"
            fill="#FFE55D"
          />
          <path
            d="M94.3958 35.6633C94.7912 35.6633 95.1703 35.5063 95.4498 35.2267C95.7294 34.9472 95.8864 34.5681 95.8864 34.1727C95.8864 33.7774 95.7294 33.3983 95.4498 33.1188C95.1703 32.8392 94.7912 32.6822 94.3958 32.6822C94.0005 32.6822 93.6214 32.8392 93.3419 33.1188C93.0623 33.3983 92.9053 33.7774 92.9053 34.1727C92.9053 34.5681 93.0623 34.9472 93.3419 35.2267C93.6214 35.5063 94.0005 35.6633 94.3958 35.6633Z"
            fill="#FFE55D"
          />
          <path
            d="M93.2548 35.9769C92.2632 35.8112 91.2957 35.524 90.3742 35.122C90.3417 35.1085 90.3123 35.0887 90.2875 35.0637C90.1784 35.0164 90.0811 34.9456 90.0024 34.8564C89.9236 34.7672 89.8655 34.6618 89.8321 34.5477C89.7349 34.2605 89.6831 33.9599 89.6787 33.6567C89.6783 33.6035 89.6938 33.5514 89.7232 33.5071C89.7526 33.4627 89.7945 33.4281 89.8437 33.4077C89.8928 33.3873 89.9469 33.382 89.999 33.3925C90.0512 33.403 90.099 33.4288 90.1365 33.4666C90.1615 33.4915 90.1814 33.5211 90.195 33.5538C90.2085 33.5864 90.2155 33.6214 90.2154 33.6567C90.2231 33.9136 90.2699 34.1674 90.3542 34.4105C90.3641 34.4372 90.3696 34.4655 90.3703 34.494C90.3703 34.4611 90.4125 34.5048 90.4416 34.5339C91.3564 34.9855 92.3347 35.2953 93.3422 35.454C93.4054 35.4718 93.4597 35.5124 93.4947 35.5679C93.5297 35.6234 93.5428 35.6899 93.5316 35.7546C93.5205 35.819 93.4862 35.8771 93.4353 35.9181C93.3843 35.959 93.3201 35.9799 93.2548 35.9769Z"
            fill="#4B1010"
          />
          <path
            d="M91.4173 41.2728C90.2289 41.3848 89.3057 38.8354 88.9277 37.7029C88.912 37.6547 88.9103 37.603 88.9229 37.5539C88.9354 37.5048 88.9616 37.4602 88.9985 37.4254C89.0354 37.3906 89.0814 37.367 89.1312 37.3574C89.1809 37.3477 89.2324 37.3524 89.2796 37.3709C89.8193 37.5839 90.3993 37.6754 90.9783 37.6387C91.5573 37.6019 92.1211 37.438 92.6295 37.1585C92.7062 37.114 92.7653 37.1232 92.914 37.1232C92.9725 37.1324 93.0278 37.1558 93.0751 37.1914C93.1224 37.2269 93.1603 37.2736 93.1854 37.3272C93.2103 37.3809 93.2215 37.44 93.218 37.4991C93.2145 37.5582 93.1965 37.6156 93.1655 37.6661C92.8028 40.0223 92.2308 41.2015 91.4173 41.2728ZM89.6086 38.0379C90.3439 40.0683 90.9887 40.7806 91.3721 40.7415C91.7554 40.7024 92.2592 39.9057 92.6096 37.7696C91.6693 38.1993 90.6102 38.294 89.6086 38.0379Z"
            fill="#4B1010"
          />
          <path
            d="M102.973 59.5621C102.819 59.1787 102.589 58.8007 102.436 58.4197C101.731 55.6011 102.012 55.023 100.456 49.921C101.677 48.4807 102.538 46.7713 102.97 44.9333C103.008 44.849 103.028 44.7575 103.028 44.665C103.028 44.5724 103.008 44.4809 102.97 44.3966C102.797 44.226 102.589 44.0951 102.36 44.0132C100.189 42.9612 98.1881 41.8518 96.1624 41.9606C95.9408 41.7781 95.4018 41.4308 95.1971 41.5006C94.3737 41.4795 93.552 41.5829 92.7596 41.8073C92.0721 42.639 91.5662 43.6054 91.2744 44.6443C91.2325 44.6633 91.1889 44.6779 91.144 44.688C90.3452 44.0366 89.5107 43.4302 88.6444 42.8715C88.4405 42.6668 87.2359 43.0908 85.5774 42.8761C85.1595 42.7688 84.7348 42.6921 84.3054 42.6461C82.061 42.5254 79.9189 41.6684 78.2105 40.2078C78.1338 40.1312 78.0571 40.0545 77.9805 40.1312C79.1996 40.8933 79.4281 43.7127 79.6566 44.9318C79.8859 45.8573 79.8859 46.8248 79.6566 47.7504C79.6982 47.8436 79.7057 47.9485 79.6777 48.0466C79.6496 48.1448 79.5878 48.2299 79.5032 48.2871C79.0905 48.3495 78.6685 48.2964 78.2841 48.1337C79.7566 49.0176 81.1583 50.0143 82.4767 51.1149C84.3982 58.7923 86.1816 61.3379 86.7413 63.2962C86.9047 64.1112 86.9882 63.6481 87.1247 70.0781C87.1148 70.3089 87.1408 70.5404 87.2014 70.7636C87.6614 71.8301 89.2586 72.0586 90.2492 72.2112C91.5602 72.4397 92.9008 72.4397 94.2118 72.2112C96.4436 71.7596 98.5989 70.9899 100.612 69.9255C101.725 69.4173 102.774 68.7779 103.736 68.0209C104.692 67.248 105.406 66.2157 105.791 65.0474C106.17 63.5293 105.433 63.9924 102.973 59.5621Z"
            fill="#FFE55D"
          />
          <path
            d="M115.494 53.4212C113.943 52.018 105.623 46.3502 103.282 44.9011C103.318 44.7144 103.293 44.5211 103.21 44.3501C103.127 44.179 102.991 44.0393 102.822 43.9518C102.209 43.5294 99.0653 41.4737 96.0405 41.5343C95.9461 41.4024 95.813 41.3032 95.6597 41.2503C95.5064 41.1974 95.3405 41.1935 95.1848 41.2391C94.241 41.3035 93.6153 41.3403 93.2266 41.3924C96.0942 39.4449 96.5726 34.6312 91.2506 30.0952C91.7868 29.7338 92.2145 29.2333 92.4879 28.6473C92.7613 28.0614 92.8701 27.4121 92.8025 26.769C92.7976 26.7158 92.7766 26.6653 92.7424 26.6243C92.7082 26.5832 92.6623 26.5535 92.6109 26.539C92.5597 26.5241 92.5051 26.525 92.4545 26.5417C92.4038 26.5584 92.3594 26.5901 92.3272 26.6325C92.0546 26.9819 91.7041 27.2626 91.3035 27.4522C91.5803 26.9873 91.6786 26.4377 91.5803 25.9056C91.4459 25.0861 91.1473 24.3021 90.7024 23.6008C90.6747 23.5594 90.6359 23.5266 90.5904 23.5061C90.545 23.4856 90.4947 23.4782 90.4453 23.4849C90.3959 23.4915 90.3493 23.5118 90.3109 23.5436C90.2724 23.5753 90.2437 23.6172 90.2278 23.6644C90.1061 24.0831 89.8258 24.4377 89.4465 24.6528C89.0045 24.8764 88.5286 25.0253 88.038 25.0937C86.4278 25.6066 84.3698 25.4142 82.9222 25.9371C81.9028 26.3633 80.9902 27.0097 80.2498 27.8299C79.5095 28.6502 78.9597 29.6241 78.6399 30.6817C78.4582 31.3248 78.4067 31.9976 78.4885 32.6608C78.5702 33.324 78.7836 33.9642 79.1161 34.5438C79.1368 34.5822 79.1613 34.6182 79.1889 34.6519C79.2035 34.6826 79.2203 34.711 79.238 34.7394C79.2372 34.7473 79.2372 34.7552 79.238 34.7631C79.2151 34.7849 79.1966 34.811 79.1835 34.8398C78.9849 35.2797 78.8818 35.7567 78.8811 36.2394C78.8803 36.7221 78.9818 37.1994 79.1789 37.64C80.099 39.7984 82.1233 40.5375 84.1283 41.233C85.03 41.5489 85.7323 41.7697 86.7153 41.1287C87.2757 41.5091 87.8869 41.8085 88.531 42.0181C88.531 42.2083 88.531 42.3808 88.5103 42.5548C87.9511 42.6985 87.3726 42.7521 86.7966 42.7135C86.1886 42.5518 85.5959 42.3401 84.9495 42.2267C84.4082 42.15 83.9527 42.15 83.416 42.0733C79.0854 41.5926 76.6249 37.926 60.9288 25.2961L61.0469 23.7541C61.0682 23.5615 61.0204 23.3675 60.912 23.2068C60.8036 23.0462 60.6416 22.9293 60.4549 22.877L59.7043 22.4721C59.497 22.303 59.2504 22.1888 58.9874 22.1402C58.7243 22.0915 58.4532 22.11 58.1992 22.1938L57.9737 22.0351C57.8184 21.8869 57.6354 21.7709 57.4351 21.6935C57.2349 21.6161 57.0213 21.579 56.8067 21.5842C56.6118 21.6337 56.4292 21.7233 56.2708 21.8472C56.1124 21.9712 55.9815 22.1268 55.8866 22.3042C55.4266 22.9989 55.6275 23.0073 55.5324 23.0518C55.2692 23.1848 55.0506 23.392 54.9036 23.6477C54.7566 23.9034 54.6876 24.1965 54.7051 24.491C54.7257 24.5815 54.7513 24.6709 54.7818 24.7586C54.7135 25.0193 54.4942 25.3129 54.4091 25.5675C54.2075 26.1763 55.1759 27.331 56.2493 27.3096C56.5243 27.5987 56.8557 27.8282 57.223 27.984C57.5903 28.1397 57.9857 28.2184 58.3847 28.2151C64.9642 36.2537 68.998 39.8352 77.0052 46.4215C77.2552 47.2379 77.7741 47.9456 78.4774 48.4297C79.8716 49.2494 81.1354 50.2731 82.2268 51.4668C84.4756 60.2598 86.5673 62.0295 86.6225 64.5981C86.7544 70.8187 86.8472 70.5634 86.9476 70.864C87.456 72.0486 89.0777 72.2978 90.1948 72.4688C90.8642 72.5784 91.5412 72.6375 92.2198 72.6444C95.947 72.6444 101.38 70.2375 103.89 68.2279C104.895 67.4194 105.643 66.3359 106.044 65.1095C106.159 64.8005 106.186 64.4652 106.12 64.1419C105.899 63.2532 103.815 61.0358 102.691 58.3506C101.988 55.5796 102.332 55.2629 100.774 50.0697C100.889 49.9225 101.001 49.773 101.11 49.622C102.467 50.6134 112.973 57.534 113.554 57.7273C116.441 58.2134 116.635 54.4525 115.494 53.4212ZM56.3513 22.5756C56.464 22.3633 56.6503 22.1999 56.875 22.1156C57.1594 22.1309 57.4293 22.249 57.6341 22.4468C57.8718 22.6171 57.7107 22.4008 57.4462 23.0326C57.3956 23.0401 57.3482 23.0618 57.3096 23.0954C57.271 23.1289 57.2429 23.1728 57.2284 23.2218C57.214 23.2708 57.2139 23.323 57.2282 23.3721C57.2424 23.4212 57.2705 23.4652 57.309 23.4988C57.1868 23.8961 57.1639 24.3174 57.2423 24.7256C56.9097 24.4333 56.606 24.1098 56.3352 23.7595C56.223 23.5797 56.1358 23.3855 56.076 23.1821C56.1134 22.9594 56.2083 22.7504 56.3513 22.5756ZM55.6612 23.6C55.721 23.7587 55.7977 23.9098 55.8912 24.0516C56.1811 24.435 56.5092 24.7877 56.8712 25.1044C57.1541 25.3344 57.2959 25.454 57.2315 25.648C57.1487 25.8964 56.6649 25.8351 56.3114 25.7247C56.0491 25.6024 55.817 25.4239 55.6315 25.2018C55.446 24.9797 55.3116 24.7195 55.238 24.4396C55.2334 24.2756 55.2696 24.1131 55.3433 23.9665C55.417 23.82 55.526 23.694 55.6605 23.6H55.6612ZM56.6396 26.6617C56.188 27.0013 55.3054 26.5643 55.0402 26.0414C54.8584 25.7722 54.8446 25.855 55.1 25.375C55.296 25.6596 55.5526 25.8973 55.8515 26.0708C56.1503 26.2443 56.4839 26.3495 56.8282 26.3787C56.8194 26.4369 56.7978 26.4924 56.7651 26.5413C56.7324 26.5902 56.6893 26.6313 56.6388 26.6617H56.6396ZM56.8635 27.1539C57.024 27.067 57.1567 26.9366 57.2464 26.7776C57.3361 26.6187 57.379 26.4376 57.3703 26.2553C57.5167 26.1742 57.6339 26.0491 57.7053 25.8977C57.7767 25.7464 57.7987 25.5764 57.7682 25.4119C57.7966 25.408 57.8235 25.4042 57.8503 25.3981C58.5741 25.6679 58.969 25.1795 59.2565 24.4626C59.2828 24.397 59.282 24.3237 59.2543 24.2587C59.2265 24.1937 59.1741 24.1424 59.1085 24.116C59.0429 24.0897 58.9696 24.0905 58.9046 24.1183C58.8396 24.146 58.7883 24.1984 58.762 24.264C58.5833 24.7087 58.4108 24.9349 58.2475 24.9349C57.608 24.9349 57.6824 24.2242 57.8242 23.6453C58.0075 22.5465 58.7758 22.4185 59.4145 22.9207L60.2533 23.3807C60.6175 23.5793 60.5538 23.288 60.3668 25.7232C60.3625 25.757 60.3651 25.7914 60.3745 25.8243C60.3839 25.8572 60.3998 25.8878 60.4212 25.9143C60.4427 25.9409 60.4693 25.9629 60.4995 25.9789C60.5297 25.9949 60.5627 26.0047 60.5968 26.0076C60.6635 27.331 58.341 28.3585 56.8642 27.1539H56.8635ZM95.2515 41.7605C93.5977 43.0317 93.1046 43.0977 91.7628 44.0607C92.0328 43.3112 92.4328 42.6151 92.9444 42.0043C93.7052 41.8601 94.4766 41.7786 95.2508 41.7605H95.2515ZM91.8012 42.7197C91.5227 43.228 91.2898 43.7598 91.105 44.3091C91.0283 44.2478 89.5232 43.0823 89.0232 42.7802C89.0501 42.5771 89.0639 42.3716 89.0646 42.1669C89.9565 42.3649 90.8841 42.3335 91.7605 42.0756C91.7421 42.2911 91.7559 42.5081 91.8019 42.7197H91.8012ZM84.5094 40.7376C83.314 40.0744 83.84 39.0316 84.4588 39.3145C84.8291 39.5714 85.1389 39.9065 85.3658 40.296C85.5192 40.526 85.6725 40.4746 85.7492 40.3573C85.9095 40.5107 86.0789 40.6525 86.2499 40.7875C85.9844 40.9425 85.6808 41.0203 85.3735 41.0122C85.0661 41.0041 84.7671 40.9103 84.5101 40.7415L84.5094 40.7376ZM86.1525 40.0016C86.3013 39.6235 85.9708 37.1822 84.3706 35.434C84.917 35.5937 85.4346 35.839 85.9041 36.1609C85.9538 36.194 86.0132 36.2094 86.0728 36.2049C86.1324 36.2003 86.1887 36.1759 86.2328 36.1356C86.2769 36.0953 86.3062 36.0414 86.3161 35.9825C86.326 35.9236 86.3159 35.863 86.2875 35.8105C85.8687 35.0727 85.2779 34.4469 84.5654 33.9864C85.5899 34.0837 86.5976 34.3131 87.5633 34.6688C87.617 34.6881 87.6753 34.6897 87.7299 34.6734C87.7845 34.6571 87.8324 34.6238 87.8667 34.5783C87.901 34.5328 87.9198 34.4775 87.9204 34.4205C87.921 34.3635 87.9034 34.3079 87.87 34.2617C87.3374 33.5223 86.634 32.9225 85.8198 32.5135C87.4161 31.8702 89.4035 31.3802 90.8282 30.4088C92.7685 31.8431 94.1507 33.9066 94.7386 36.2468C94.8855 36.8125 94.9167 37.402 94.8306 37.9801C94.7444 38.5582 94.5426 39.113 94.2371 39.6113C93.9311 40.1095 93.5275 40.5407 93.0507 40.8791C92.5739 41.2174 92.0336 41.4559 91.4623 41.5803C90.5165 41.799 89.5302 41.7685 88.5997 41.4918C87.6693 41.215 86.8266 40.7016 86.1541 40.0016H86.1525ZM88.3194 43.1322C88.3922 43.1138 88.4834 43.0908 88.4589 43.0655C89.0524 43.3913 89.6083 43.7816 90.1174 44.2286C89.1377 44.0056 88.1827 43.6853 87.2666 43.2725C87.6224 43.2723 87.9767 43.2251 88.3201 43.1322H88.3194ZM98.9894 46.4767C101.495 52.965 101.569 56.1155 102.103 58.1827C102.171 58.5101 102.294 58.8237 102.467 59.1105C104.749 63.6765 105.885 63.5699 105.556 64.8902C104.991 67.1544 102.598 68.7025 100.483 69.6901C98.4947 70.7396 96.3667 71.4999 94.1635 71.9481C92.8631 72.159 91.5374 72.1552 90.2385 71.9389C89.2816 71.7925 87.8363 71.5701 87.4529 70.6784C87.3954 70.5051 87.295 70.9644 87.1623 64.5912C87.1056 61.8784 85.4648 61.1186 83.0372 52.4098C83.1361 52.5348 83.2335 52.6606 83.3294 52.7886C83.3731 52.8412 83.4354 52.875 83.5034 52.8828C83.5714 52.8907 83.6397 52.872 83.6943 52.8308C83.7486 52.7895 83.7852 52.7292 83.7966 52.662C83.8079 52.5948 83.7933 52.5257 83.7557 52.4689C82.6035 50.9253 81.2006 49.5858 79.6053 48.5063C80.934 47.794 79.7517 42.3041 79.1007 40.9309C82.3771 43.0662 83.6644 42.3662 85.8167 42.9903C85.8364 43.032 85.8665 43.0679 85.9041 43.0946C86.9835 43.7975 88.177 44.3071 89.4311 44.6005C90.4265 49.3198 92.1698 53.8497 94.5952 58.0186C94.633 58.075 94.6909 58.1148 94.757 58.13C94.8232 58.1452 94.8926 58.1346 94.9512 58.1004C95.0098 58.0662 95.0532 58.011 95.0725 57.9459C95.0919 57.8809 95.0857 57.8109 95.0552 57.7503C92.7036 53.7085 91.0007 49.3228 90.0085 44.7531C90.2301 44.8091 90.4517 44.8635 90.6725 44.9179C91.5481 45.1349 91.0245 45.1855 92.5257 44.1788C94.5479 47.0966 95.9989 50.3711 96.8019 53.8291C96.815 53.879 96.8424 53.924 96.8806 53.9586C96.9189 53.9932 96.9664 54.016 97.0173 54.0241C97.0682 54.0322 97.1204 54.0254 97.1675 54.0044C97.2147 53.9834 97.2547 53.9491 97.2826 53.9058C97.3205 53.8481 97.3345 53.778 97.3218 53.7103C96.506 50.1922 95.0322 46.8601 92.9781 43.8897C93.9288 43.3547 94.8393 42.7512 95.7024 42.084C97.9881 41.9031 100.814 43.2204 102.548 44.4096C102.596 44.4321 102.638 44.4643 102.673 44.5042C102.708 44.544 102.734 44.5907 102.75 44.6411C102.765 44.6917 102.77 44.7451 102.764 44.7977C102.758 44.8503 102.74 44.901 102.713 44.9463C102.307 46.572 101.586 48.102 100.59 49.4494C100.257 48.3833 99.8888 47.3282 99.4871 46.2858C99.4655 46.2404 99.4316 46.2021 99.3892 46.1751C99.3469 46.148 99.2977 46.1335 99.2475 46.1331C99.1973 46.1327 99.1479 46.1465 99.1051 46.1728C99.0623 46.1991 99.0278 46.237 99.0055 46.282C98.9761 46.3427 98.9706 46.4122 98.9902 46.4767H98.9894Z"
            fill="#4B1010"
          />
          <path
            d="M93.5242 29.9993L82.7046 39.9042L83.0857 40.3612L82.7813 40.6663L83.0098 40.9707L83.6952 40.3612L83.2383 39.8283L85.448 37.9229L85.905 38.4565L86.2861 38.0755L86.5905 38.4565L86.9715 38.1521L87.3526 38.6091L87.7337 38.304L88.0381 38.6091L90.4005 36.4753L90.0953 36.0183L90.3245 35.7898L90.0953 35.4087L90.4005 35.1043L89.6383 34.2663L90.0562 33.8369L90.4764 34.1896L90.7815 33.8852L91.2385 34.2663L91.5437 33.9611L91.924 34.2663L92.1532 34.037L92.5335 34.4181L94.4389 32.742L94.1338 32.4376L94.2863 32.2091L93.8294 31.6754L94.1338 31.2943L93.8294 31.0659L94.2104 30.6848L93.5242 29.9993Z"
            fill="#4B1010"
          />
          <path
            d="M94.4771 32.4031L94.6197 32.1884L94.175 31.6693L94.5139 31.2461L94.2348 31.0368L94.5867 30.6848L93.5324 29.6298L82.3379 39.8797L82.7259 40.3451L82.4299 40.6411L82.9712 41.3633L84.0692 40.3873L83.6145 39.8567L85.4195 38.3002L85.8902 38.8492L86.2644 38.475L86.5496 38.8315L86.933 38.5248L87.3164 38.9849L87.7151 38.6659L88.0302 38.981L90.7514 36.5275L90.4401 36.0597L90.661 35.8389L90.4309 35.4555L90.7675 35.1182L90.0008 34.2747L90.0706 34.2027L90.4884 34.5531L90.7951 34.2464L91.2552 34.6297L91.5619 34.323L91.9453 34.6297L92.1546 34.4212L92.5234 34.79L94.8298 32.7604L94.4771 32.4031ZM90.0299 35.0952L89.7577 35.3674L89.9877 35.7507L89.7524 35.9869L90.0506 36.4347L88.0479 38.2434L87.7534 37.9498L87.39 38.2404L87.0066 37.7803L86.6294 38.0817L86.3074 37.6745L85.9194 38.0625L85.5628 37.6469L89.2685 34.254L90.0299 35.0952ZM92.5426 34.0532L92.1507 33.6598L91.9016 33.909L91.5182 33.6023L91.2176 33.9029L90.7576 33.5195L90.4509 33.8262L90.0729 33.5088L93.5056 30.3651L93.823 30.6818L93.4128 31.092L93.744 31.3396L93.4726 31.6785L93.9419 32.226L93.7801 32.4683L94.0392 32.7267L92.5426 34.0532Z"
            fill="#FFE55D"
          />
          <path
            d="M86.209 37.3898L86.5897 37.7706L86.8946 37.4657L86.5897 37.1615L86.209 37.3898Z"
            fill="#FFE55D"
          />
          <path
            d="M86.9712 37.4657L87.3519 37.9223L87.6569 37.6181L87.3519 37.1615L86.9712 37.4657Z"
            fill="#FFE55D"
          />
          <path
            d="M86.9712 36.7043L87.3519 37.0843L87.6569 36.856L87.3519 36.4753L86.9712 36.7043Z"
            fill="#FFE55D"
          />
          <path
            d="M87.7334 37.6182L88.1142 37.999L88.4183 37.6941L88.0375 37.3133L87.7334 37.6182Z"
            fill="#FFE55D"
          />
          <path
            d="M87.7334 36.8561L88.1142 37.2368L88.4183 36.9327L88.0375 36.5519L87.7334 36.8561Z"
            fill="#FFE55D"
          />
          <path
            d="M88.4956 36.9328L88.7998 37.3128L89.1047 37.0845L88.7998 36.7045L88.4956 36.9328Z"
            fill="#FFE55D"
          />
          <path
            d="M90.9336 33.1987L91.2377 33.5036L91.5426 33.1987L91.2377 32.8945L90.9336 33.1987Z"
            fill="#FFE55D"
          />
          <path
            d="M91.6191 33.1987L91.9233 32.8945L92.304 33.2753L91.9233 33.5794L91.6191 33.1987Z"
            fill="#FFE55D"
          />
          <path
            d="M91.6191 32.5132L91.9233 32.8939L92.2282 32.589L91.9233 32.209L91.6191 32.5132Z"
            fill="#FFE55D"
          />
          <path
            d="M92.3047 32.5891L92.6854 32.9698L92.9903 32.6657L92.6096 32.2849L92.3047 32.5891Z"
            fill="#FFE55D"
          />
          <path
            d="M127.508 24.5132C125.522 24.3777 123.527 24.4211 121.549 24.6428C125.23 30.1565 131.496 39.441 133.678 44.8566C131.982 44.0884 130.13 43.7233 128.269 43.79C123.392 79.0674 107.316 110.154 79.5037 132.48C69.9033 140.175 58.4741 145.131 45.2163 147.947C42.4117 148.53 39.5622 148.87 36.6992 148.963C41.5924 149.183 46.4947 148.842 51.3104 147.947C64.5682 145.204 75.9997 140.175 85.5979 132.556C113.408 110.231 129.104 80.2106 133.98 44.9333C135.908 44.8183 137.842 44.8183 139.77 44.9333C137.564 39.4472 131.163 29.9993 127.508 24.5132Z"
            fill="white"
          />
          <path
            d="M6.13135 139.184C14.2842 144.442 24.6422 145.944 34.1706 143.985C94.8687 131.504 110.974 59.4862 114.86 41.5082C113.287 41.0034 111.617 40.8721 109.984 41.1248C113.945 35.7913 117.298 30.7622 121.413 24.4389C125.069 29.9242 131.47 39.3728 133.681 44.8581C131.984 44.09 130.133 43.725 128.271 43.7916C123.395 79.0697 107.326 110.166 79.5062 132.481C69.908 140.179 58.4758 145.117 45.2187 147.947C34.5501 150.224 18.3725 149.25 6.81683 141.775C6.37365 141.488 5.9159 141.53 5.90286 140.404C5.86452 137.203 5.74951 142.69 5.74951 139.49L6.13135 139.184Z"
            fill="#FFE55D"
          />
          <path
            d="M140.022 44.8336C137.767 39.2364 131.165 29.5155 127.73 24.3653C127.707 24.3316 127.677 24.3034 127.642 24.283C127.607 24.2625 127.568 24.2503 127.527 24.2472C125.579 24.1126 123.623 24.1509 121.681 24.3614L121.634 24.2894C121.609 24.2528 121.576 24.2229 121.537 24.2022C121.498 24.1815 121.455 24.1707 121.411 24.1707C121.367 24.1707 121.324 24.1815 121.285 24.2022C121.246 24.2229 121.213 24.2528 121.188 24.2894C110.25 41.1026 109.493 40.8205 109.754 41.2575C109.781 41.3028 109.82 41.3391 109.868 41.3618C109.915 41.3844 109.969 41.3924 110.021 41.3848C111.532 41.149 113.077 41.2509 114.545 41.6831C101.816 100.33 74.0073 135.61 34.1125 143.722C24.2836 145.765 14.1364 144.029 6.27265 138.958C6.05029 138.815 5.48059 139.229 5.48059 139.487C5.40616 140.175 5.55539 140.868 5.90614 141.464C6.10703 141.765 6.44286 141.847 6.67289 142.001C14.9714 147.208 25.3103 149.285 34.4215 149.285C40.1185 149.285 46.0071 149.361 51.3667 148.211C64.9658 145.395 76.2178 140.342 85.7715 132.764C112.838 111.032 129.14 81.5693 134.218 45.1886C136.063 45.0824 137.914 45.0855 139.759 45.1978C139.826 45.2011 139.892 45.1789 139.944 45.1358C139.996 45.0926 140.029 45.0315 140.038 44.9647C140.044 44.9204 140.038 44.8753 140.022 44.8336ZM6.16913 140.397C6.16537 140.1 6.15463 139.803 6.13693 139.506C14.0966 144.578 24.3227 146.306 34.2229 144.246C81.4217 134.653 104.903 88.8404 115.12 41.5611C115.133 41.4973 115.123 41.4307 115.09 41.3741C115.057 41.3175 115.005 41.2749 114.943 41.2544C113.532 40.7944 112.04 40.6364 110.564 40.789C114.203 35.8634 117.34 31.1824 121.415 24.9242C124.788 29.9802 130.8 38.8729 133.181 44.3605C131.614 43.7517 129.939 43.4682 128.259 43.5271C128.196 43.5299 128.137 43.5544 128.09 43.5963C128.044 43.6383 128.014 43.6952 128.005 43.7571C122.975 80.1463 106.146 110.756 79.3385 132.275C70.0301 139.737 58.8509 144.779 45.1629 147.687C34.6171 149.946 18.7101 148.926 6.96425 141.553C6.50804 141.25 6.1699 141.339 6.16913 140.397ZM85.4349 132.347C75.9533 139.871 64.7741 144.889 51.2578 147.682C48.481 148.236 45.6635 148.562 42.8335 148.658C43.6522 148.531 44.4671 148.381 45.2772 148.207C59.048 145.279 70.3 140.203 79.6751 132.688C106.537 111.124 123.419 80.479 128.505 44.0515C130.29 44.0439 132.056 44.4089 133.691 45.125C128.628 81.36 112.395 110.706 85.4349 132.347V132.347ZM133.893 44.681C131.67 39.2126 125.382 29.905 122.015 24.8629C123.79 24.6843 125.576 24.653 127.356 24.7693C130.742 29.8445 137.017 39.1022 139.363 44.6427C137.542 44.5554 135.716 44.5684 133.896 44.6818L133.893 44.681Z"
            fill="#4B1010"
          />
          <path
            d="M107.01 103.222C105.553 102.736 104.16 101.792 104.648 100.326C104.955 99.716 105.639 99.4116 105.867 98.802L103.353 95.6783C102.21 97.3544 100.076 98.1925 99.0865 99.9452C98.9426 100.145 98.8624 100.384 98.8564 100.631C98.8564 102.051 101.585 105.493 105.562 105.202C106.401 105.141 107.466 104.742 107.543 103.907V103.6C107.398 103.433 107.216 103.303 107.01 103.222Z"
            fill="white"
          />
          <path
            d="M115.712 70.4207C111.656 70.1922 107.59 70.1922 103.534 70.4207C101.661 69.9185 99.8441 70.6323 98.0905 71.3255C92.8766 73.3857 90.1348 72.1965 88.0791 71.7042C88.2285 73.3791 88.6206 75.0233 89.243 76.5854C90.0496 78.467 92.6581 79.5527 93.7469 79.9338C99.361 81.8046 106.643 80.2144 112.379 78.8956C106.945 83.7959 106.077 91.2464 101.548 96.6527C101.413 96.8137 101.523 96.9656 101.602 97.0905C100.53 97.8166 99.6009 98.7354 98.8634 99.8002C98.7019 100.039 98.6078 100.317 98.5912 100.605C98.5746 100.893 98.6361 101.18 98.7691 101.436C99.4062 102.792 100.462 103.909 101.78 104.622C103.099 105.333 104.612 105.603 106.095 105.392C108.048 104.972 108.27 103.364 107.092 102.971C105.829 102.551 104.468 101.713 104.885 100.448C105.069 100.151 105.3 99.8861 105.568 99.663C105.779 99.6595 105.986 99.6012 106.168 99.4936C106.35 99.3861 106.5 99.233 106.605 99.0496C111.503 93.0229 116.76 87.0576 120.939 80.37C121.973 78.9583 122.644 77.3139 122.893 75.5817C123.162 70.9789 117.753 70.5733 115.712 70.4207ZM104.396 100.241C104.271 100.626 104.263 101.04 104.372 101.43C104.481 101.819 104.703 102.168 105.009 102.432C105.572 102.903 106.224 103.257 106.926 103.474C107.601 103.698 107.219 104.6 106.006 104.874C104.641 105.059 103.253 104.806 102.042 104.151C100.83 103.497 99.8577 102.474 99.2644 101.232C99.1638 101.053 99.1156 100.85 99.1254 100.645C99.1352 100.441 99.2025 100.243 99.3196 100.075C100.018 99.0731 100.896 98.2093 101.909 97.5268C102.656 98.525 103.727 99.2329 104.938 99.5296C104.718 99.7335 104.534 99.9743 104.396 100.241Z"
            fill="#4B1010"
          />
        </svg>

        <div className=" text-2xl font-bold z-10 mt-10">Sign-in</div>
        <button
          className=" z-10 border-black border rounded-3xl bg-white font-bold py-2 px-2 hover:bg-orange-400 hover:border-orange-400 hover:text-white"
          onClick={() => signIn()}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
