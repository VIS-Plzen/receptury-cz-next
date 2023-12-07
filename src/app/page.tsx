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
import MealSymbol from "@/components/symbols/MealSymbol";
import Compound from "@/components/templates/CompoundComponents";
import FormComponent from "@/components/templates/FormComponent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import StyledLink from "@/components/ui/StyledLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Container className="flex flex-col items-center justify-center gap-10 py-24">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-4xl lg:text-6xl">
          Receptury - základ projektu
        </h1>
        <p className="mx-auto max-w-prose">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
          dolores praesentium a minus fuga sequi porro tempora dolor perferendis
          voluptatum!
        </p>
      </Container>

      <Container className="flex flex-wrap gap-2 py-10">
        <ButtonIcon icon="favorite" />
        <ButtonIcon icon="favorite-fill" />
        <ButtonIcon icon="share" />
        <ButtonIcon icon="print" />
        <ButtonIcon icon="downloading" />
        <ButtonIcon icon="archive" />
        <ButtonIcon icon="rate-review" />
        <ButtonIcon icon="visibility" />
        <ButtonIcon icon="visibility-off" />

        <ButtonIcon>
          <ErrorIcon />
        </ButtonIcon>
      </Container>

      <Container as={"section"}>
        <Heading as={"h1"} size="md">
          Lorem ipsum dolor
        </Heading>
      </Container>

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
        <FavoriteFillIcon />
        <FavoriteIcon />
        <FilterListIcon />
        <HelpIcon />
        <HomeIcon />
        <ListIcon />
        <MailIcon />
        <PhoneIphoneIcon />
        <PlayIcon />
        <PrintIcon />
        <RateReviewIcon />
        <SearchIcon />
        <ShareIcon />
        <TuneIcon />
        <VisibilityIcon />
        <VisibilityOffIcon />
      </Container>

      <Container className="flex flex-wrap gap-5">
        <MealSymbol />
      </Container>

      <Container className="flex flex-wrap items-start justify-start gap-5 py-20">
        <Button variant="primary">
          Button <CheckIcon />
        </Button>
        <Button variant="primary-outline">
          <CheckIcon /> Button
        </Button>
        <Button variant="primary-text">
          <CheckIcon /> Button
        </Button>

        <Button variant="secondary">Button</Button>
        <Button variant="secondary-outline">Button</Button>

        <Button variant="black">Button</Button>
      </Container>

      <Container>
        <Tabs defaultValue="recommended" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="recommended">Doporučené pro vás</TabsTrigger>
            <TabsTrigger value="favorites">Oblíbené</TabsTrigger>
            <TabsTrigger value="new">Nové recepty</TabsTrigger>
          </TabsList>
          <TabsContent value="recommended">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
            nostrum dicta, unde deserunt, ipsum, quas repudiandae.
          </TabsContent>
          <TabsContent value="favorites">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
            reiciendis, fugiat dicta inventore magni ut incidunt ipsam impedit,
            veniam recusandae magnam aliquam aliquid earum rem odit.
          </TabsContent>
          <TabsContent value="new">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
            nostrum dicta, unde deserunt, ipsum, quas repudiandae excepturi
            ullam sapiente nobis veniam eum.
          </TabsContent>
        </Tabs>
      </Container>

      <Container>
        <Compound.Root>
          <Compound.First>
            <Compound.Second />
          </Compound.First>
        </Compound.Root>
      </Container>

      <Container className="flex flex-wrap items-start justify-start gap-5 py-20">
        <Button size="sm">Button</Button>
        <Button size="md">Button</Button>
        <Button size="lg">Button</Button>
      </Container>

      <Container className="flex flex-wrap items-start justify-start gap-5 py-20">
        <Badge>Badge</Badge>
        <Badge>Badge very long</Badge>
      </Container>

      <Container className="flex flex-wrap items-start justify-start gap-5 py-20">
        <StyledLink href="https://facebook.com">StyledLink</StyledLink>
      </Container>
    </div>
  );
}
