
![Meowvricks](rocktags/public/image/Logo.svg)
<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="40" alt="python logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" height="40" alt="googlecloud logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" height="40" alt="firebase logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="40" alt="docker logo"  />
</div>  <br />

Proof-of-concept website to show tracker locations.

---

## Getting Started

This project also relies on [rocktags-backend](https://github.com/t0rrential/rocktags-backend) to work. An installation and setup guide is provided in the README of that repo.

### 1. **Clone the Repository**

```bash
git clone https://github.com/ghiyascode/rocktags.git  
cd rocktags
```

### 2. **Install Dependencies**

```bash
npm i

# if you also want to write and deploy your own cloud functions, do the following
cd rocktags/functions/
npm i
```

### 3. **Set up Environment Variables**

In the `rocktags`, create an `.env` file and add the following fields to it:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY = ""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = ""
NEXT_PUBLIC_FIREBASE_PROJECT_ID = ""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = ""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = ""
NEXT_PUBLIC_FIREBASE_APP_ID = ""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = ""
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = ""
```

### 4. Run the Project

You can start the project by running the following:

```bash
npm run dev
```

## Trackers

The trackers for this project were made with firmware from [macless-haystack](https://github.com/dchristl/macless-haystack).


Ensure your Firebase workspace is on a Blaze plan, or some parts of this project may not work properly.

