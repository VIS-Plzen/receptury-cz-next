import {
  AccountCircleIcon,
  AddIcon,
  ArchiveIcon,
  ArrowDownwardAltIcon,
  ArrowLeftAltIcon,
  ArrowRightAltIcon,
  ArrowUpwardAltIcon,
  CalendarViewMontsIcon,
  CallIcon,
  CancelIcon,
  CheckCircleIcon,
  CheckIcon,
  CheckSmallIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DownloadingIcon,
  ErrorIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  FavoriteIcon,
  FilterListIcon,
  HelpIcon,
  HomeIcon,
  ListIcon,
  MailIcon,
  PhoneIphoneIcon,
  PlayArrowIcon,
  PrintIcon,
  RateReviewIcon,
  SearchIcon,
  ShareIcon,
  TuneIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "@/components/icons";
import FormComponent from "@/components/templates/FormComponent";
import Container from "@/components/ui/Container";
import StyledLink from "@/components/ui/StyledLink";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-4xl lg:text-6xl">
        Receptury - základ projektu
      </h1>
      <p className="mx-auto max-w-prose">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
        dolores praesentium a minus fuga sequi porro tempora dolor perferendis
        voluptatum!
      </p>
      <Container>
        <FormComponent />
      </Container>

      <Container className="flex flex-wrap gap-5">
        <AccountCircleIcon />
        <AddIcon />
        <ArchiveIcon />
        <ArrowDownwardAltIcon />
        <ArrowLeftAltIcon />
        <ArrowRightAltIcon />
        <ArrowUpwardAltIcon />
        <CalendarViewMontsIcon />
        <CallIcon />
        <CancelIcon />
        <CheckCircleIcon />
        <CheckIcon />
        <CheckSmallIcon />
        <ChevronLeftIcon />
        <ChevronRightIcon />
        <CloseIcon />
        <DownloadingIcon />
        <ErrorIcon />
        <ExpandLessIcon />
        <ExpandMoreIcon />
        <FavoriteIcon />
        <FilterListIcon />
        <HelpIcon />
        <HomeIcon />
        <ListIcon />
        <MailIcon />
        <PhoneIphoneIcon />
        <PlayArrowIcon />
        <PrintIcon />
        <RateReviewIcon />
        <SearchIcon />
        <ShareIcon />
        <TuneIcon />
        <VisibilityIcon />
        <VisibilityOffIcon />
      </Container>

      <Container>
        <StyledLink asChild className="bg-error-100">
          <button>Google</button>
        </StyledLink>
      </Container>
    </div>
  );
}
