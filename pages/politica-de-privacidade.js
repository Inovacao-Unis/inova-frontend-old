import Layout from '@components/Layout';
import {
  Container,
  Text,
  Heading,
  Flex,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const Politica = () => (
  <Layout painel>
    <Flex w="100vw" minH="89vh" direction="column" align="center">
      <Container maxW="container.xl">
        <Heading
          fontSize="2.5rem"
          fontWeight="700"
          textAlign="center"
          m="100px auto"
        >
          política de privacidade
        </Heading>
        <Flex
          direction="column"
          bg="white"
          color="black"
          p="40px"
          borderRadius="4px"
        >
          <Text mt="20px" mb="5px">
            A sua privacidade é importante para nós. É política do Inova
            respeitar a sua privacidade em relação a qualquer informação sua que
            possamos coletar no site <a href="inova.uaiinovei.com.br">Inova </a>
            , e outros sites que possuímos e operamos.
          </Text>
          <Text mt="20px" mb="5px">
            Solicitamos informações pessoais apenas quando realmente precisamos
            delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
            legais, com o seu conhecimento e consentimento. Também informamos
            por que estamos coletando e como será usado.
          </Text>
          <Text mt="20px" mb="5px">
            Apenas retemos as informações coletadas pelo tempo necessário para
            fornecer o serviço solicitado. Quando armazenamos dados, os
            protegemos dentro de meios comercialmente aceitáveis para evitar
            perdas e roubos, bem como acesso, divulgação, cópia, uso ou
            modificação não autorizados.
          </Text>
          <Text mt="20px" mb="5px">
            Não compartilhamos informações de identificação pessoal publicamente
            ou com terceiros, exceto quando exigido por lei.
          </Text>
          <Text mt="20px" mb="5px">
            O nosso site pode ter links para sites externos que não são operados
            por nós. Esteja ciente de que não temos controle sobre o conteúdo e
            práticas desses sites e não podemos aceitar responsabilidade por
            suas respectivas políticas de privacidade.
          </Text>
          <Text mt="20px" mb="5px">
            Você é livre para recusar a nossa solicitação de informações
            pessoais, entendendo que talvez não possamos fornecer alguns dos
            serviços desejados.
          </Text>
          <Text mt="20px" mb="50px">
            O uso continuado de nosso site será considerado como aceitação de
            nossas práticas em torno de privacidade e informações pessoais. Se
            você tiver alguma dúvida sobre como lidamos com dados do usuário e
            informações pessoais, entre em contato conosco.
          </Text>
          <Text fontSize="lg" mb="20px" fontWeight="bold">
            Política de Cookies Inova{' '}
          </Text>{' '}
          <Text fontSize="md" fontWeight="bold" mb="5px">
            O que são cookies?
          </Text>
          <Text mb="30px">
            Como é prática comum em quase todos os sites profissionais, este
            site usa cookies, que são pequenos arquivos baixados no seu
            computador, para melhorar sua experiência. Esta página descreve
            quais informações eles coletam, como as usamos e por que às vezes
            precisamos armazenar esses cookies. Também compartilharemos como
            você pode impedir que esses cookies sejam armazenados, no entanto,
            isso pode fazer o downgrade ou &apos;quebrar&apos; certos elementos
            da funcionalidade do site.
          </Text>
          <Text fontSize="md" fontWeight="bold">
            Como usamos os cookies?
          </Text>
          <Text mb="30px">
            Utilizamos cookies por vários motivos, detalhados abaixo.
            Infelizmente, na maioria dos casos, não existem opções padrão do
            setor para desativar os cookies sem desativar completamente a
            funcionalidade e os recursos que eles adicionam a este site. É
            recomendável que você deixe todos os cookies se não tiver certeza se
            precisa ou não deles, caso sejam usados para fornecer um serviço que
            você usa.
          </Text>
          <Text fontSize="md" fontWeight="bold">
            Desativar cookies
          </Text>
          <Text mb="30px">
            Você pode impedir a configuração de cookies ajustando as
            configurações do seu navegador (consulte a ajuda do navegador para
            saber como fazer isso). Esteja ciente de que a desativação de
            cookies afetará a funcionalidade deste e de muitos outros sites que
            você visita. A desativação de cookies geralmente resultará na
            desativação de determinadas funcionalidades e recursos deste site.
            Portanto, é recomendável que você não desative os cookies.
          </Text>
          <Text fontSize="md" fontWeight="bold">
            Cookies que definimos
          </Text>
          <UnorderedList>
            <ListItem>
              Cookies relacionados à conta
              <br />
              <br /> Se você criar uma conta conosco, usaremos cookies para o
              gerenciamento do processo de inscrição e administração geral.
              Esses cookies geralmente serão excluídos quando você sair do
              sistema, porém, em alguns casos, eles poderão permanecer
              posteriormente para lembrar as preferências do seu site ao sair.
              <br />
              <br />
            </ListItem>
            <ListItem>
              Cookies relacionados ao login
              <br />
              <br /> Utilizamos cookies quando você está logado, para que
              possamos lembrar dessa ação. Isso evita que você precise fazer
              login sempre que visitar uma nova página. Esses cookies são
              normalmente removidos ou limpos quando você efetua logout para
              garantir que você possa acessar apenas a recursos e áreas
              restritas ao efetuar login.
              <br />
              <br />
            </ListItem>
            <ListItem>
              Cookies relacionados a pesquisas
              <br />
              <br /> Periodicamente, oferecemos pesquisas e questionários para
              fornecer informações interessantes, ferramentas úteis ou para
              entender nossa base de usuários com mais precisão. Essas pesquisas
              podem usar cookies para lembrar quem já participou numa pesquisa
              ou para fornecer resultados precisos após a alteração das páginas.
              <br />
              <br />
            </ListItem>
            <ListItem>
              Cookies relacionados a formulários
              <br />
              <br /> Quando você envia dados por meio de um formulário como os
              encontrados nas páginas de contato, os cookies podem ser
              configurados para lembrar os detalhes do usuário para
              correspondência futura.
              <br />
              <br />
            </ListItem>
            <ListItem mb="30px">
              Cookies de preferências do site
              <br />
              <br /> Para proporcionar uma ótima experiência neste site,
              fornecemos a funcionalidade para definir suas preferências de como
              esse site é executado quando você o usa. Para lembrar suas
              preferências, precisamos definir cookies para que essas
              informações possam ser chamadas sempre que você interagir com uma
              página for afetada por suas preferências.
              <br />
            </ListItem>
          </UnorderedList>
          <Text fontSize="md" fontWeight="bold">
            Cookies de Terceiros
          </Text>
          <Text mb="20px">
            Em alguns casos especiais, também usamos cookies fornecidos por
            terceiros confiáveis. A seção a seguir detalha quais cookies de
            terceiros você pode encontrar através deste site.
          </Text>
          <UnorderedList>
            <ListItem>
              Este site usa o Google Analytics, que é uma das soluções de
              análise mais difundidas e confiáveis da Web, para nos ajudar a
              entender como você usa o site e como podemos melhorar sua
              experiência. Esses cookies podem rastrear itens como quanto tempo
              você gasta no site e as páginas visitadas, para que possamos
              continuar produzindo conteúdo atraente.
            </ListItem>
            <ListItem>
              Este site usa Firebase, que é um serviço de login e análise
              fornecido pelo Google Inc.
            </ListItem>
          </UnorderedList>
          <Text mt="20px" mb="30px">
            Para mais informações sobre cookies do Google Analytics e Firebase,
            consulte a página oficial do Google Analytics e Firebase.
          </Text>
          <UnorderedList>
            <ListItem>
              As análises de terceiros são usadas para rastrear e medir o uso
              deste site, para que possamos continuar produzindo conteúdo
              atrativo. Esses cookies podem rastrear itens como o tempo que você
              passa no site ou as páginas visitadas, o que nos ajuda a entender
              como podemos melhorar o site para você.
            </ListItem>
            <ListItem mb="30px">
              Periodicamente, testamos novos recursos e fazemos alterações sutis
              na maneira como o site se apresenta. Quando ainda estamos testando
              novos recursos, esses cookies podem ser usados para garantir que
              você receba uma experiência consistente enquanto estiver no site,
              enquanto entendemos quais otimizações os nossos usuários mais
              apreciam.
            </ListItem>
          </UnorderedList>
          <Text fontSize="md" fontWeight="bold">
            Compromisso do Usuário
          </Text>
          <Text mb="10px">
            O usuário se compromete a fazer uso adequado dos conteúdos e da
            informação que o Inova oferece no site e com caráter enunciativo,
            mas não limitativo:
          </Text>
          <UnorderedList mb="30px">
            <ListItem>
              A) Não se envolver em atividades que sejam ilegais ou contrárias à
              boa fé a à ordem pública;
            </ListItem>
            <ListItem>
              B) Não difundir propaganda ou conteúdo de natureza racista,
              xenofóbica, ou casas de apostas legais, jogos de sorte e azar,
              qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou
              contra os direitos humanos;
            </ListItem>
            <ListItem>
              C) Não causar danos aos sistemas físicos (hardwares) e lógicos
              (softwares) do Inova , de seus fornecedores ou terceiros, para
              introduzir ou disseminar vírus informáticos ou quaisquer outros
              sistemas de hardware ou software que sejam capazes de causar danos
              anteriormente mencionados.
            </ListItem>
          </UnorderedList>
          <Text fontSize="md" fontWeight="bold">
            Mais informações
          </Text>
          <Text mb="50px">
            Esperemos que esteja esclarecido e, como mencionado anteriormente,
            se houver algo que você não tem certeza se precisa ou não,
            geralmente é mais seguro deixar os cookies ativados, caso interaja
            com um dos recursos que você usa em nosso site.
          </Text>
          <Text mb="50px">
            Esta política é efetiva a partir de <strong>Novembro</strong>/
            <strong>2021</strong>.
          </Text>
        </Flex>
      </Container>
    </Flex>
  </Layout>
);

export default Politica;
