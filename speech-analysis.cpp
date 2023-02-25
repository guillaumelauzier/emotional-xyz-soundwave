#include <iostream>
#include <vector>
#include <cmath>
#include <fftw3.h>

using namespace std;

const int WINDOW_SIZE = 512; // Size of the FFT window
const int HOP_SIZE = 256;    // Hop size between consecutive windows

vector<double> computeSTFT(vector<double>& audio, int sampleRate) {
  int audioLength = audio.size();
  int numWindows = ceil((double)(audioLength - WINDOW_SIZE) / HOP_SIZE);
  int fftSize = (WINDOW_SIZE / 2) + 1;

  fftw_complex* fftIn = (fftw_complex*) fftw_malloc(sizeof(fftw_complex) * WINDOW_SIZE);
  fftw_complex* fftOut = (fftw_complex*) fftw_malloc(sizeof(fftw_complex) * fftSize);
  fftw_plan fftPlan = fftw_plan_dft_1d(WINDOW_SIZE, fftIn, fftOut, FFTW_FORWARD, FFTW_MEASURE);

  vector<double> stft(fftSize * numWindows, 0.0);

  for (int i = 0; i < numWindows; i++) {
    int startIndex = i * HOP_SIZE;
    int endIndex = startIndex + WINDOW_SIZE;
    if (endIndex > audioLength) endIndex = audioLength;
    int windowSize = endIndex - startIndex;
    vector<double> window(audio.begin() + startIndex, audio.begin() + endIndex);

    for (int j = 0; j < windowSize; j++) {
      fftIn[j][0] = window[j] * sin(M_PI * j / (windowSize - 1));
      fftIn[j][1] = 0.0;
    }

    fftw_execute(fftPlan);

    for (int j = 0; j < fftSize; j++) {
      stft[i * fftSize + j] = sqrt(pow(fftOut[j][0], 2) + pow(fftOut[j][1], 2));
    }
  }

  fftw_destroy_plan(fftPlan);
  fftw_free(fftIn);
  fftw_free(fftOut);

  return stft;
}

int main() {
  // Load audio from file or microphone input
  // ...

  // Compute STFT of audio signal
  vector<double> stft = computeSTFT(audio, sampleRate);

  // Extract features from STFT
  // ...

  return 0;
}
