import Logo from "@/components/brand/Logo";
import LogoNaseStrava from "@/components/brand/LogoNaseStrava";
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
  FavoriteFillIcon,
  FavoriteIcon,
  FilterListIcon,
  HelpIcon,
  HomeIcon,
  ListIcon,
  MailIcon,
  PhoneIphoneIcon,
  PlayIcon,
  PrintIcon,
  RateReviewIcon,
  SearchIcon,
  ShareIcon,
  TuneIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "@/components/icons";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import MealSymbol from "@/components/symbols/MealSymbol";
import FormComponent from "@/components/templates/FormComponent";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StyledLink from "@/components/ui/StyledLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const icons = [
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
  FavoriteFillIcon,
  FavoriteIcon,
  FilterListIcon,
  HelpIcon,
  HomeIcon,
  ListIcon,
  MailIcon,
  PhoneIphoneIcon,
  PlayIcon,
  PrintIcon,
  RateReviewIcon,
  SearchIcon,
  ShareIcon,
  TuneIcon,
  VisibilityIcon,
  VisibilityOffIcon,
];

export default function Components() {
  return (
    <div>
      {/* Hero */}
      <Container className="flex items-center justify-center py-56 text-center">
        <Heading as={"h1"} size="2xl">
          Seznam komponentů
        </Heading>
      </Container>

      {/* Brand components */}
      <Container className="border-t-2 border-primary-200 py-36">
        <Heading as={"h2"} size="lg" hasMarginBottom>
          Brand
        </Heading>
        <div className="flex flex-wrap gap-6 pt-5">
          <Logo />
          <LogoNaseStrava />
        </div>
      </Container>

      {/* Forms components */}
      {/* Error - fix intelisense */}
      <Container className="border-t-2 border-primary-200 py-36">
        <Heading as={"h2"} size="lg" hasMarginBottom>
          Forms
        </Heading>
        <div className="max-w-2xl pt-5">
          <FormComponent />
        </div>
      </Container>

      {/* Icons components */}
      <Container className="border-t-2 border-primary-200 py-36">
        <Heading as={"h2"} size="lg" hasMarginBottom>
          Icons
        </Heading>
        <div className="flex flex-wrap gap-6 pt-5">
          {icons.map((Icon, index) => (
            <Icon key={index} />
          ))}
        </div>
      </Container>

      {/* Motion components */}
      <Container className="border-t-2 border-primary-200 py-36">
        <Heading as={"h2"} size="lg" hasMarginBottom>
          Motion
        </Heading>
        <div className="flex flex-col flex-wrap gap-6 pt-5">
          <Heading as={"h3"} size="sm" hasMarginBottom>
            Fade In
          </Heading>
          <FadeIn>
            <div className="h-28 w-28 bg-primary" />
          </FadeIn>
        </div>
        <div className="flex flex-col flex-wrap gap-6 pt-5">
          <Heading as={"h3"} size="sm" hasMarginBottom>
            Fade In stagger
          </Heading>
          <FadeInStagger className="flex flex-wrap gap-6">
            <FadeIn>
              <div className="h-28 w-28 bg-primary" />
            </FadeIn>
            <FadeIn>
              <div className="h-28 w-28 bg-primary" />
            </FadeIn>
            <FadeIn>
              <div className="h-28 w-28 bg-primary" />
            </FadeIn>
            <FadeIn>
              <div className="h-28 w-28 bg-primary" />
            </FadeIn>
            <FadeIn>
              <div className="h-28 w-28 bg-primary" />
            </FadeIn>
            <FadeIn>
              <div className="h-28 w-28 bg-primary" />
            </FadeIn>
            <FadeIn>
              <div className="h-28 w-28 bg-primary" />
            </FadeIn>
            <FadeIn>
              <div className="h-28 w-28 bg-primary" />
            </FadeIn>
          </FadeInStagger>
        </div>
      </Container>

      {/* Symbols components */}
      <Container className="border-t-2 border-primary-200 py-36">
        <Heading as={"h2"} size="lg" hasMarginBottom>
          Symbols
        </Heading>
        <div className="flex flex-wrap gap-6 pt-5">
          <MealSymbol />
          <div className="flex items-center justify-center rounded-2xl bg-primary-200 p-8">
            <MealSymbol />
          </div>
        </div>
      </Container>

      {/* Ui components */}
      <Container className="border-t-2 border-primary-200 py-36">
        <Heading as={"h2"} size="lg" hasMarginBottom>
          Ui components
        </Heading>
        <div>
          <Heading size="sm" hasMarginBottom>
            Avatar
          </Heading>
          <div className="flex flex-wrap gap-6 pb-12 pt-5">
            <Avatar size="xs" name="Name Surname" />
            <Avatar size="sm" name="Name Surname" />
            <Avatar size="md" name="Name Surname" />
            <Avatar size="lg" name="Name Surname" />
            <Avatar size="xl" name="Name Surname" />
            <Avatar size="2xl" name="Name Surname" />
          </div>
          <div className="flex flex-wrap gap-6 pb-12 pt-5">
            <Avatar fallbackColor="primary" size="xs" name="Name Surname" />
            <Avatar fallbackColor="primary" size="sm" name="Name Surname" />
            <Avatar fallbackColor="primary" size="md" name="Name Surname" />
            <Avatar fallbackColor="primary" size="lg" name="Name Surname" />
            <Avatar fallbackColor="primary" size="xl" name="Name Surname" />
            <Avatar fallbackColor="primary" size="2xl" name="Name Surname" />
          </div>

          <Heading size="sm" hasMarginBottom>
            Badge
          </Heading>
          <div className="flex flex-wrap gap-6 pb-12 pt-5">
            <Badge>Badge subtle</Badge>
            <Badge variant="text">Badge text</Badge>
          </div>

          <Heading size="sm" hasMarginBottom>
            Button
          </Heading>
          <div className="flex flex-wrap gap-6 pt-5">
            <Button variant="primary">Primary</Button>
            <Button variant="primary-outline">Primary outline</Button>
            <Button variant="primary-text">Primary text</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary-outline">Secondary outline</Button>
            <Button variant="black">Black</Button>
          </div>
          <div className="flex flex-wrap items-start justify-start gap-6 pt-5">
            <Button size="sm" variant="primary">
              Size sm
            </Button>
            <Button size="md" variant="primary">
              Size md
            </Button>
            <Button size="lg" variant="primary">
              Size lg
            </Button>
            <Button size="sm" variant="secondary">
              Size sm
            </Button>
            <Button size="md" variant="secondary">
              Size md
            </Button>
            <Button size="lg" variant="secondary">
              Size lg
            </Button>
          </div>

          <div className="flex flex-wrap items-start justify-start gap-6 pb-20 pt-5">
            <Button variant="primary">
              <ArrowLeftAltIcon />
              Left icon
            </Button>
            <Button variant="primary">
              Right icon
              <ArrowRightAltIcon />
            </Button>
            <Button variant="primary">
              <ArrowLeftAltIcon />
              Both icons
              <ArrowRightAltIcon />
            </Button>
          </div>

          <Heading size="sm" hasMarginBottom>
            ButtonIcon - with predefined icons
          </Heading>
          <div className="flex flex-wrap gap-6 pb-5 pt-5">
            <ButtonIcon icon="archive" />
            <ButtonIcon icon="calendar-view-months" />
            <ButtonIcon icon="downloading" />
            <ButtonIcon icon="favorite-fill" />
            <ButtonIcon icon="favorite" />
            <ButtonIcon icon="list" />
            <ButtonIcon icon="print" />
            <ButtonIcon icon="rate-review" />
            <ButtonIcon icon="share" />
            <ButtonIcon icon="visibility" />
            <ButtonIcon icon="visibility-off" />
          </div>
          <Heading size="sm" hasMarginBottom>
            ButtonIcon - custom icon (children prop)
          </Heading>
          <div className="flex flex-wrap gap-6 pb-12 pt-5">
            <ButtonIcon>
              <ErrorIcon />
            </ButtonIcon>
          </div>

          <Heading size="sm" hasMarginBottom>
            Headings
          </Heading>
          <div className="flex flex-col gap-6 pb-12 pt-5">
            <Heading as={"h1"} size="2xl">
              Heading 2xl
            </Heading>
            <Heading as={"h2"} size="xl">
              Heading xl
            </Heading>
            <Heading as={"h3"} size="lg">
              Heading lg
            </Heading>
            <Heading as={"h4"} size="md">
              Heading md
            </Heading>
            <Heading as={"h5"} size="sm">
              Heading sm
            </Heading>
            <Heading as={"h6"} size="xs">
              Heading xs
            </Heading>
            <Heading as={"h6"} size="inherit">
              Heading - inherit text size
            </Heading>
          </div>

          <Heading size="sm" hasMarginBottom>
            Loading Spinner
          </Heading>
          <div className="flex flex-wrap gap-6 pb-12 pt-5">
            <LoadingSpinner size="inherit" />
            <LoadingSpinner size="xs" />
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
            <LoadingSpinner size="xl" />
            <LoadingSpinner size="2xl" />
          </div>
          <div className="flex flex-wrap gap-6 pb-12 pt-5">
            <LoadingSpinner color="primary" size="inherit" />
            <LoadingSpinner color="primary" size="xs" />
            <LoadingSpinner color="primary" size="sm" />
            <LoadingSpinner color="primary" size="md" />
            <LoadingSpinner color="primary" size="lg" />
            <LoadingSpinner color="primary" size="xl" />
            <LoadingSpinner color="primary" size="2xl" />
          </div>

          <Heading size="sm" hasMarginBottom>
            Styled Link
          </Heading>
          <div className="flex flex-wrap gap-6 pb-12 pt-5 text-xl">
            <StyledLink hoverEffect="appear" href="#">
              hover effect appear
            </StyledLink>
            <StyledLink hoverEffect="slide-back" href="#">
              hover effect slide-back
            </StyledLink>
            <StyledLink hoverEffect="static" href="#">
              hover effect static
            </StyledLink>
          </div>
          <div className="flex flex-wrap gap-6 pb-12 pt-5 text-xl">
            <StyledLink hoverEffect="appear" href="#" className="text-primary">
              different color
            </StyledLink>
            <StyledLink
              hoverEffect="slide-back"
              href="#"
              className="text-secondary-700"
            >
              different color
            </StyledLink>
            <StyledLink
              hoverEffect="static"
              href="#"
              className="text-error-600"
            >
              different color
            </StyledLink>
          </div>
          <div className="flex flex-wrap gap-6 pb-12 pt-5 text-xl">
            <StyledLink hoverEffect="appear" href="#">
              with icon <ArrowRightAltIcon />
            </StyledLink>
            <StyledLink hoverEffect="slide-back" href="#">
              with icon <ArrowRightAltIcon />
            </StyledLink>
            <StyledLink hoverEffect="static" href="#">
              with icon <ArrowRightAltIcon />
            </StyledLink>
          </div>

          <Heading size="sm" hasMarginBottom>
            Tabs
          </Heading>
          <Tabs defaultValue="recommended" className="w-[640px]">
            <TabsList>
              <TabsTrigger value="recommended">Doporučené pro vás</TabsTrigger>
              <TabsTrigger value="favorites">Oblíbené</TabsTrigger>
              <TabsTrigger value="new">Nové receptury</TabsTrigger>
            </TabsList>
            <TabsContent value="recommended">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nostrum dicta, unde deserunt, ipsum, quas repudiandae.
            </TabsContent>
            <TabsContent value="favorites">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
              reiciendis, fugiat dicta inventore magni ut incidunt ipsam
              impedit, veniam recusandae magnam aliquam aliquid earum rem odit.
            </TabsContent>
            <TabsContent value="new">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nostrum dicta, unde deserunt, ipsum, quas repudiandae excepturi
              ullam sapiente nobis veniam eum.
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="recommended" className="w-[640px] pt-20">
            <TabsList className="flex w-full items-center justify-evenly">
              <TabsTrigger value="recommended" className="w-full">
                Doporučené pro vás
              </TabsTrigger>
              <TabsTrigger value="favorites" className="w-full">
                Oblíbené
              </TabsTrigger>
              <TabsTrigger value="new" className="w-full">
                Nové receptury
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recommended">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nostrum dicta, unde deserunt, ipsum, quas repudiandae.
            </TabsContent>
            <TabsContent value="favorites">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
              reiciendis, fugiat dicta inventore magni ut incidunt ipsam
              impedit, veniam recusandae magnam aliquam aliquid earum rem odit.
            </TabsContent>
            <TabsContent value="new">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nostrum dicta, unde deserunt, ipsum, quas repudiandae excepturi
              ullam sapiente nobis veniam eum.
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
}
