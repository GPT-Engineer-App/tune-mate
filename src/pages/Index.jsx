import { useState } from "react";
import { Container, VStack, HStack, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Box, Image } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    albumArt: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGFydCUyMG9uZXxlbnwwfHx8fDE3MTU4NDM3ODB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    src: "path/to/song1.mp3",
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    albumArt: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGFydCUyMHR3b3xlbnwwfHx8fDE3MTU4NDM3ODB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    src: "path/to/song2.mp3",
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    albumArt: "https://images.unsplash.com/photo-1498843053639-170ff2122f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGFydCUyMHRocmVlfGVufDB8fHx8MTcxNTg0Mzc4MXww&ixlib=rb-4.0.3&q=80&w=1080",
    src: "path/to/song3.mp3",
  },
];

const Index = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audio = new Audio(songs[currentSongIndex].src);

  const playPauseHandler = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSongHandler = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const prevSongHandler = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const onSliderChange = (value) => {
    setProgress(value);
    audio.currentTime = (audio.duration * value) / 100;
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Image src={songs[currentSongIndex].albumArt} boxSize="200px" objectFit="cover" borderRadius="md" />
        <Text fontSize="2xl">{songs[currentSongIndex].title}</Text>
        <Text fontSize="lg">{songs[currentSongIndex].artist}</Text>
        <HStack spacing={4}>
          <IconButton aria-label="Previous Song" icon={<FaBackward />} onClick={prevSongHandler} />
          <IconButton aria-label="Play/Pause" icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={playPauseHandler} />
          <IconButton aria-label="Next Song" icon={<FaForward />} onClick={nextSongHandler} />
        </HStack>
        <Box width="100%">
          <Slider value={progress} onChange={onSliderChange}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
